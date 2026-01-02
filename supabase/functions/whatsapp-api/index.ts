import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use the exact string you pasted in Meta Dashboard
const VERIFY_TOKEN = "your_chosen_secret_verify_token";

serve(async (req) => {
  const url = new URL(req.url);

  // 1. Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // 2. Handle Meta Webhook Verification (GET request)
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook Verified!");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // 3. Handle POST Requests
  if (req.method === "POST") {
    const payload = await req.json();

    if (payload.object === "whatsapp_business_account") {
      const value = payload.entry?.[0]?.changes?.[0]?.value;

      const supabaseServiceRole = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      // --- 1. Handle Status Updates ---
      const statusUpdate = value?.statuses?.[0];
      if (statusUpdate) {
        // Matches 'whatsapp_message_id' from your DB in image_1b81af.png
        await supabaseServiceRole
          .from('messages')
          .update({ status: statusUpdate.status })
          .eq('whatsapp_message_id', statusUpdate.id);

        return new Response("STATUS_UPDATED", { status: 200 });
      }

      // --- 2. Handle New Incoming Messages ---
      const message = value?.messages?.[0];
      if (message) {
        // We use 'whatsapp_message_id' to match your schema in image_1b81af.png
        const { error } = await supabaseServiceRole.from('messages').insert({
          whatsapp_message_id: message.id,
          sender_phone: message.from,
          content: message.text?.body,
          direction: 'inbound',
          status: 'received'
        });

        if (error) console.error("DB Insert Error:", error);
        return new Response("MESSAGE_SAVED", { status: 200 });
      }

      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    // Outgoing Dashboard Logic
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response("Not Found", { status: 404 });
});