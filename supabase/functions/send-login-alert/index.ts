
// @ts-ignore
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore
import { Resend } from "npm:resend@2.0.0";
import {
    handleCors,
    applyRateLimit,
    jsonResponse,
    errorResponse,
} from "../_shared/security.ts";

declare const Deno: any;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface LoginAlertRequest {
    email: string;
    userAgent?: string;
    ip?: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    const preflight = handleCors(req);
    if (preflight) return preflight;

    // This function is called internally (server-to-server) on every login.
    // Rate-limit tightly to 10/min per IP to prevent abusing it as an email spam vector.
    const rl = applyRateLimit(req, { prefix: "login-alert", max: 10 });
    if (rl) return rl;

    try {
        const { email, userAgent, ip }: LoginAlertRequest = await req.json();

        if (!email) return errorResponse(req, 400, "Email is required");

        // Basic email format check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return errorResponse(req, 400, "Invalid email address");
        }

        console.log(`Sending login alert for ${email}`);

        const { data, error } = await resend.emails.send({
            from: "Login Alert <onboarding@resend.dev>",
            to: [email],
            subject: "New Login Detected",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Login Detected</h2>
          <p>We detected a new login to your account.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Account:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            ${userAgent ? `<p><strong>Device:</strong> ${String(userAgent).slice(0, 200)}</p>` : ''}
            ${ip ? `<p><strong>IP Address:</strong> ${String(ip).slice(0, 50)}</p>` : ''}
          </div>
          <p>If this was you, you can ignore this email. If you did not sign in, please contact support immediately.</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            // Still return 200 so login is not blocked by email failure
            return jsonResponse(req, { error });
        }

        return jsonResponse(req, data);
    } catch (error: any) {
        console.error("Error:", error);
        return errorResponse(req, 500, error.message);
    }
};

serve(handler);
