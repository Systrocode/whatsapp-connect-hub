// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
    handleCors,
    applyRateLimit,
    jsonResponse,
    errorResponse,
} from "../_shared/security.ts";

declare const Deno: any;

serve(async (req: Request) => {
    // 1. CORS preflight
    const preflight = handleCors(req);
    if (preflight) return preflight;

    // 2. Rate-limit by IP.  This is a public contact form endpoint,
    //    so we apply a tight limit to prevent spam / email-bombing.
    //    20 requests per minute per IP address.
    const rateLimitResp = applyRateLimit(req, { prefix: "quote-request", max: 20 });
    if (rateLimitResp) return rateLimitResp;

    try {
        const body = await req.json();
        const { firstName, lastName, email, company, message, volume } = body;

        // Basic input validation — never trust client data
        if (!email || !firstName) {
            return errorResponse(req, 400, "Missing required fields: firstName and email");
        }

        // Rudimentary email format check (the email service does final validation)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return errorResponse(req, 400, "Invalid email address");
        }

        // Sanitize string inputs to prevent template injection in the HTML email body
        const sanitize = (s: unknown) =>
            String(s ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

        const safeFirst = sanitize(firstName);
        const safeLast = sanitize(lastName);
        const safeEmail = sanitize(email);
        const safeCompany = sanitize(company);
        const safeVolume = sanitize(volume);
        const safeMessage = sanitize(message);

        console.log(`Quote request from ${safeFirst} ${safeLast} (${safeEmail})`);

        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "support@systrocode.com";

        if (RESEND_API_KEY) {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "WA Connect Hub <onboarding@resend.dev>",
                    to: ADMIN_EMAIL,
                    reply_to: email,
                    subject: `New Quote Request from ${safeCompany}`,
                    html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${safeFirst} ${safeLast}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Company:</strong> ${safeCompany}</p>
            <p><strong>Message Volume:</strong> ${safeVolume}</p>
            <hr />
            <p><strong>Requirement:</strong></p>
            <p>${safeMessage}</p>
          `,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                // Log server-side but don't leak internal error details to client
                console.error("Failed to send email via API", data);
            }
        } else {
            console.log("RESEND_API_KEY not set — skipping email send in dev mode.");
        }

        return jsonResponse(req, { success: true, message: "Quote request received" });
    } catch (error) {
        console.error("Error processing quote request:", error);
        return errorResponse(req, 400, (error as Error).message);
    }
});
