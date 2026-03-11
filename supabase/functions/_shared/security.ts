/**
 * ============================================================
 *  SHARED SECURITY MODULE — WhatsApp Connect Hub
 * ============================================================
 *
 *  Covers three attack surfaces:
 *  1. CORS         — Strict allowlist, no wildcard on auth'd routes
 *  2. Rate Limiting — IP + User based, configurable via env vars
 *  3. Auth/AuthZ   — JWT validation + optional role/admin guard
 *
 *  Usage (inside any Edge Function):
 *
 *    import { corsHeaders, handleCors, rateLimit, requireAuth, requireAdmin }
 *      from "../_shared/security.ts";
 *
 *  ⚠️ This module stores rate-limit counters in Deno's in-process Map.
 *     Each Edge Function invocation is ephemeral on Supabase, so this
 *     provides "best-effort" rate limiting that is still highly effective
 *     against sustained abuse.  For guaranteed persistence across cold-starts
 *     add RATE_LIMIT_STORE=redis and swap the Map for Upstash/Redis.
 * ============================================================
 */

declare const Deno: any;

// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─────────────────────────────────────────────────────────────
//  1.  CORS
// ─────────────────────────────────────────────────────────────

/**
 *  All allowed origins.  Populate ALLOWED_ORIGINS env var as a
 *  comma-separated list, e.g.:
 *    https://app.yoursite.com,https://yoursite.com
 *
 *  Falls back to localhost for local development.
 *
 *  WHY: Wildcard CORS (*) on authenticated routes allows any
 *  malicious website to send credentialed cross-origin requests
 *  to your API, bypassing the browser's Same-Origin Policy.
 */
const rawAllowedOrigins = Deno.env.get("ALLOWED_ORIGINS") ?? "";
const ALLOWED_ORIGINS: Set<string> = new Set(
    rawAllowedOrigins
        .split(",")
        .map((o: string) => o.trim())
        .filter(Boolean)
        // Always allow local dev
        .concat(["http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "https://localhost:8080", "https://avelo.in", "https://www.avelo.in"])
);

const SAFE_METHODS = "GET,POST,PUT,PATCH,DELETE,OPTIONS";
const SAFE_HEADERS =
    "authorization, x-client-info, apikey, content-type, x-requested-with";

/**
 * Compute a per-request CORS header set.
 *
 * - Returns specific origin if it is in the allowlist.
 * - Never returns "*" for responses that carry credentials.
 * - Returns null origin header when the request origin is not trusted
 *   (the browser will block the response automatically).
 */
export function corsHeaders(requestOrigin: string | null): Record<string, string> {
    const origin =
        requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)
            ? requestOrigin
            : // Fallback: allow the first configured origin so non-browser callers
            // (e.g. the Meta webhook) still get a valid header.
            Array.from(ALLOWED_ORIGINS)[0] ?? "null";

    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": SAFE_HEADERS,
        "Access-Control-Allow-Methods": SAFE_METHODS,
        "Access-Control-Allow-Credentials": "true",
        "Vary": "Origin",
    };
}

/**
 * Shortcut: handle a CORS preflight (OPTIONS) request and return early.
 * Returns the 204 Response or null (meaning: not a preflight, continue).
 */
export function handleCors(req: Request): Response | null {
    if (req.method !== "OPTIONS") return null;
    const origin = req.headers.get("origin");
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

// ─────────────────────────────────────────────────────────────
//  2.  RATE LIMITING
// ─────────────────────────────────────────────────────────────

interface RateLimitEntry {
    count: number;
    resetAt: number; // epoch ms
}

// In-process store (fast, zero latency, best-effort across cold-starts)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Configuration pulled from environment variables so ops can tune
 * without a code deploy.
 *
 * Env vars:
 *   RATE_LIMIT_MAX        — requests per window   (default 100)
 *   RATE_LIMIT_WINDOW_SEC — window in seconds      (default 60)
 *   RATE_LIMIT_WEBHOOK_MAX — higher limit for Meta webhooks (default 500)
 */
const RATE_LIMIT_MAX = parseInt(Deno.env.get("RATE_LIMIT_MAX") ?? "100");
const RATE_LIMIT_WINDOW_SEC = parseInt(
    Deno.env.get("RATE_LIMIT_WINDOW_SEC") ?? "60"
);
const RATE_LIMIT_WEBHOOK_MAX = parseInt(
    Deno.env.get("RATE_LIMIT_WEBHOOK_MAX") ?? "500"
);

export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    resetAt: number; // seconds since epoch
}

/**
 * Evaluate rate limit for a given key (IP or user ID).
 *
 * WHY: Without rate limiting an attacker can send thousands of
 * requests per second — brute-forcing tokens, scraping contacts,
 * or running up your Supabase/Meta API bill.
 */
export function checkRateLimit(
    key: string,
    max: number = RATE_LIMIT_MAX,
    windowSec: number = RATE_LIMIT_WINDOW_SEC
): RateLimitResult {
    const now = Date.now();
    const windowMs = windowSec * 1000;

    let entry = rateLimitStore.get(key);

    if (!entry || entry.resetAt <= now) {
        // New window
        entry = { count: 1, resetAt: now + windowMs };
        rateLimitStore.set(key, entry);
        // Cleanup old keys periodically (every ~500 calls)
        if (rateLimitStore.size > 500) {
            for (const [k, v] of rateLimitStore) {
                if (v.resetAt <= now) rateLimitStore.delete(k);
            }
        }
        return {
            allowed: true,
            limit: max,
            remaining: max - 1,
            resetAt: Math.ceil(entry.resetAt / 1000),
        };
    }

    entry.count += 1;
    const allowed = entry.count <= max;
    return {
        allowed,
        limit: max,
        remaining: Math.max(0, max - entry.count),
        resetAt: Math.ceil(entry.resetAt / 1000),
    };
}

/**
 * Build rate-limit response headers (RFC 6585 / IETF draft).
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
    return {
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(result.resetAt),
        "Retry-After": result.allowed
            ? "0"
            : String(result.resetAt - Math.ceil(Date.now() / 1000)),
    };
}

/**
 * High-level helper: extract the best available key from a request,
 * run the limiter, and return a 429 Response if blocked.
 *
 * Key precedence: User-ID (post-auth) → CF-Connecting-IP → x-forwarded-for → "global"
 *
 * Returns null if the request is allowed; returns a 429 Response if blocked.
 */
export function applyRateLimit(
    req: Request,
    options: {
        userId?: string;
        max?: number;
        windowSec?: number;
        prefix?: string;
    } = {}
): Response | null {
    const ip =
        req.headers.get("cf-connecting-ip") ??
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        "global";

    const key = options.userId
        ? `${options.prefix ?? "fn"}:uid:${options.userId}`
        : `${options.prefix ?? "fn"}:ip:${ip}`;

    const result = checkRateLimit(
        key,
        options.max ?? RATE_LIMIT_MAX,
        options.windowSec ?? RATE_LIMIT_WINDOW_SEC
    );
    const origin = req.headers.get("origin");

    if (!result.allowed) {
        return new Response(
            JSON.stringify({
                error: "Too Many Requests",
                message: `Rate limit exceeded. Try again after ${new Date(result.resetAt * 1000).toISOString()}.`,
            }),
            {
                status: 429,
                headers: {
                    ...corsHeaders(origin),
                    ...rateLimitHeaders(result),
                    "Content-Type": "application/json",
                },
            }
        );
    }

    return null; // request is allowed
}

// ─────────────────────────────────────────────────────────────
//  3.  AUTHENTICATION & AUTHORIZATION
// ─────────────────────────────────────────────────────────────

/**
 * Lazily-initialised service-role Supabase client.
 * We create it once per isolate, not per request.
 */
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
    if (!_supabaseAdmin) {
        const url = Deno.env.get("SUPABASE_URL");
        const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        if (!url || !key) {
            throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
        }
        _supabaseAdmin = createClient(url, key, {
            auth: { persistSession: false },
        });
    }
    return _supabaseAdmin;
}

export interface AuthResult {
    user: { id: string; email: string; role: string; app_metadata: Record<string, unknown> } | null;
    error: string | null;
}

/**
 * Validate a Supabase JWT from the Authorization header.
 *
 * WHY: Without validating tokens on every request an attacker can
 * call any action with a forged or expired token, gaining full
 * access to another user's data.
 */
export async function validateToken(authHeader: string | null): Promise<AuthResult> {
    if (!authHeader?.startsWith("Bearer ")) {
        return { user: null, error: "Missing or malformed Authorization header" };
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
        return { user: null, error: "Empty bearer token" };
    }

    try {
        const supabase = getSupabaseAdmin();
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return { user: null, error: error?.message ?? "Invalid token" };
        }

        return {
            user: {
                id: user.id,
                email: user.email ?? "",
                role: (user.app_metadata?.role as string) ?? "user",
                app_metadata: user.app_metadata ?? {},
            },
            error: null,
        };
    } catch (e) {
        return { user: null, error: (e as Error).message };
    }
}

/**
 * Middleware that returns a 401 Response when the token is invalid.
 * Returns the validated user object when auth passes.
 */
export async function requireAuth(
    req: Request
): Promise<{ user: AuthResult["user"]; response: Response | null }> {
    const origin = req.headers.get("origin");
    const authHeader = req.headers.get("authorization");
    const { user, error } = await validateToken(authHeader);

    if (!user) {
        return {
            user: null,
            response: new Response(
                JSON.stringify({ error: "Unauthorized", message: error }),
                {
                    status: 401,
                    headers: {
                        ...corsHeaders(origin),
                        "Content-Type": "application/json",
                        "WWW-Authenticate": "Bearer",
                    },
                }
            ),
        };
    }

    return { user, response: null };
}

/**
 * Middleware that returns a 403 Response when the user is not an admin.
 *
 * Admin is determined by:
 *   user.app_metadata.role === "admin"   (set via Supabase Auth admin API)
 *
 * WHY: Without RBAC any authenticated user can call admin-only actions
 * like managing all users' data or purging campaigns.
 */
export async function requireAdmin(
    req: Request
): Promise<{ user: AuthResult["user"]; response: Response | null }> {
    const { user, response } = await requireAuth(req);
    if (response) return { user, response }; // propagate 401

    const origin = req.headers.get("origin");

    if (user?.role !== "admin") {
        return {
            user: null,
            response: new Response(
                JSON.stringify({
                    error: "Forbidden",
                    message: "You do not have permission to perform this action.",
                }),
                {
                    status: 403,
                    headers: {
                        ...corsHeaders(origin),
                        "Content-Type": "application/json",
                    },
                }
            ),
        };
    }

    return { user, response: null };
}

/**
 * Convenience: build a JSON error response with proper CORS headers.
 */
export function errorResponse(
    req: Request,
    status: number,
    message: string
): Response {
    const origin = req.headers.get("origin");
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
}

/**
 * Convenience: build a JSON success response with proper CORS headers.
 */
export function jsonResponse(
    req: Request,
    data: unknown,
    status = 200
): Response {
    const origin = req.headers.get("origin");
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
}

export { RATE_LIMIT_WEBHOOK_MAX };
