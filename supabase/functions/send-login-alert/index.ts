
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LoginAlertRequest {
    email: string;
    userAgent?: string;
    ip?: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, userAgent, ip }: LoginAlertRequest = await req.json();

        console.log(`Sending login alert for ${email}`);

        if (!email) {
            throw new Error("Email is required");
        }

        const { data, error } = await resend.emails.send({
            from: "Login Alert <onboarding@resend.dev>", // Update this to your verified domain
            to: [email],
            subject: "New Login Detected",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Login Detected</h2>
          <p>We detected a new login to your account.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Account:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            ${userAgent ? `<p><strong>Device:</strong> ${userAgent}</p>` : ''}
            ${ip ? `<p><strong>IP Address:</strong> ${ip}</p>` : ''}
          </div>
          <p>If this was you, you can ignore this email. If you did not sign in, please contact support immediately.</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return new Response(JSON.stringify({ error }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
};

serve(handler);
