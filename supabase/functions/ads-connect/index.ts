// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
    handleCors,
    corsHeaders,
    applyRateLimit,
    requireAuth,
    jsonResponse,
    errorResponse,
} from "../_shared/security.ts";

declare const Deno: any;

serve(async (req: Request) => {
    // 1. CORS preflight
    const preflight = handleCors(req);
    if (preflight) return preflight;

    // 2. Rate-limit by IP (30 req/min — this endpoint exchanges Facebook tokens,
    //    abuse would cost Meta API quota and potentially compromise the user's ad account)
    const rateLimitResp = applyRateLimit(req, { prefix: "ads-connect", max: 30 });
    if (rateLimitResp) return rateLimitResp;

    // 3. Require authenticated user BEFORE touching any token exchange logic.
    //    The old code validated the user AFTER already exchanging the short-lived token,
    //    meaning an unauthenticated attacker could trigger token exchanges for free.
    const { user, response: authError } = await requireAuth(req);
    if (authError) return authError;
    const authenticatedUser = user!;

    try {
        const body = await req.json();
        const { access_token: shortLivedToken } = body;

        if (!shortLivedToken || typeof shortLivedToken !== "string") {
            return errorResponse(req, 400, "access_token is required");
        }

        // Secrets are read from environment — never hardcoded
        const metaAppId = Deno.env.get("META_APP_ID");
        const metaAppSecret = Deno.env.get("META_APP_SECRET");
        if (!metaAppId || !metaAppSecret) {
            console.error("META_APP_ID / META_APP_SECRET not configured");
            return errorResponse(req, 500, "Server configuration error");
        }

        console.log("Exchanging short-lived token for long-lived token...");

        const tokenResponse = await fetch(
            `https://graph.facebook.com/v21.0/oauth/access_token?` +
            `grant_type=fb_exchange_token&` +
            `client_id=${metaAppId}&` +
            `client_secret=${metaAppSecret}&` +
            `fb_exchange_token=${shortLivedToken}`
        );

        const tokenData = await tokenResponse.json();

        const { access_token, error: tokenError } = tokenData;
        if (tokenError) {
            console.error("Token Error:", JSON.stringify(tokenError));
            return errorResponse(req, 400, tokenError.message || "Token exchange failed");
        }

        // Get First Ad Account (MVP)
        const adAccountsResponse = await fetch(
            `https://graph.facebook.com/v21.0/me/adaccounts?access_token=${access_token}&fields=id,name,account_id`
        );
        const adAccountsData = await adAccountsResponse.json();
        const adAccounts = adAccountsData.data || [];
        const firstAdAccount = adAccounts.length > 0 ? adAccounts[0].id : null;

        // Save to DB using authenticated user (already verified above)
        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        const { error: dbError } = await supabaseAdmin
            .from("whatsapp_settings")
            .upsert(
                {
                    user_id: authenticatedUser.id,
                    fb_user_access_token: access_token,
                    ad_account_id: firstAdAccount,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "user_id" }
            );

        if (dbError) throw dbError;

        return jsonResponse(req, { success: true, ad_account_id: firstAdAccount });
    } catch (error) {
        console.error("Error:", error);
        return errorResponse(req, 500, (error as Error).message);
    }
});
