import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        const { invite_id, site_url } = await req.json();

        if (!invite_id) {
            throw new Error("Missing invite_id");
        }

        // 1. Fetch Invite Details
        const { data: invite, error: inviteError } = await supabaseClient
            .from("team_invites")
            .select(`
        *,
        team:teams (name)
      `)
            .eq("id", invite_id)
            .single();

        if (inviteError || !invite) {
            console.error("Invite fetch error:", inviteError);
            throw new Error("Invalid invite ID");
        }

        // 2. Construct Invite Link
        const inviteLink = `${site_url || 'http://localhost:8080'}/join-team?token=${invite.token}`;

        console.log(`Preparing to send invite to ${invite.email} for team ${invite.team?.name}`);
        console.log(`Invite Link: ${inviteLink}`);

        // 3. Send Email (INTEGRATION POINT)
        // TODO: Uncomment and configure your email provider below (e.g., Resend)

        /*
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY) {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "WA Business <onboarding@yourdomain.com>",
              to: invite.email,
              subject: `Join ${invite.team?.name} on WA Business`,
              html: `
                <h2>You've been invited!</h2>
                <p>You have been invited to join the team <strong>${invite.team?.name}</strong>.</p>
                <p><a href="${inviteLink}" style="padding: 10px 20px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px;">Accept Invitation</a></p>
                <p>Or copy this link: ${inviteLink}</p>
              `,
            }),
          });
          
          const data = await res.json();
          console.log("Email sent response:", data);
        } else {
          console.log("Mock Email Sent (No API Key provided)");
        }
        */

        // For now, we return success so the UI works.
        return new Response(
            JSON.stringify({ success: true, message: "Invite processed (mock email sent)", link: inviteLink }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error) {
        console.error("Error processing invite:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
