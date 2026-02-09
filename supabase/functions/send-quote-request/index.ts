import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { firstName, lastName, email, company, message, volume } = await req.json();

        if (!email || !firstName) {
            throw new Error("Missing required fields");
        }

        console.log(`Received quote request from ${firstName} ${lastName} (${email})`);

        // Integration with Email Provider (e.g., Resend)
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

        // Target email to receive the quote requests (e.g., the sales team)
        const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "support@systrocode.com";

        if (RESEND_API_KEY) {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "WA Connect Hub <onboarding@resend.dev>", // Or your verified domain
                    to: ADMIN_EMAIL,
                    reply_to: email,
                    subject: `New Quote Request from ${company}`,
                    html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message Volume:</strong> ${volume}</p>
            <hr />
            <p><strong>Requirement:</strong></p>
            <p>${message}</p>
          `,
                }),
            });

            const data = await res.json();
            console.log("Email API response:", data);

            if (!res.ok) {
                console.error("Failed to send email via API", data);
                // We might still return success to the user to not block them, but log error
            }
        } else {
            console.log("Mocking email send. configured RESEND_API_KEY to send real emails.");
        }

        return new Response(
            JSON.stringify({ success: true, message: "Quote request received" }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error) {
        console.error("Error processing quote request:", error);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
