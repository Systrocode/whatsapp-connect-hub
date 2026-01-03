import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Webhook verify token - should match what you set in Meta Dashboard
const VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN') || "your_chosen_secret_verify_token";

serve(async (req) => {
  const url = new URL(req.url);

  // 1. Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseServiceRole = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // 2. Handle Meta Webhook Verification (GET request)
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    console.log("Webhook verification request:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook Verified Successfully!");
      return new Response(challenge, { status: 200 });
    }
    
    console.log("Webhook verification failed - token mismatch");
    return new Response("Forbidden", { status: 403 });
  }

  // 3. Handle POST Requests (Webhooks from Meta & Dashboard actions)
  if (req.method === "POST") {
    const payload = await req.json();
    console.log("Received webhook payload:", JSON.stringify(payload, null, 2));

    // Handle incoming WhatsApp webhooks from Meta
    if (payload.object === "whatsapp_business_account") {
      const entry = payload.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      console.log("WhatsApp webhook value:", JSON.stringify(value, null, 2));

      // --- 1. Handle Status Updates (sent, delivered, read, failed) ---
      const statuses = value?.statuses;
      if (statuses && statuses.length > 0) {
        for (const statusUpdate of statuses) {
          console.log("Processing status update:", statusUpdate);
          
          const { error } = await supabaseServiceRole
            .from('messages')
            .update({ status: statusUpdate.status })
            .eq('whatsapp_message_id', statusUpdate.id);

          if (error) {
            console.error("Error updating message status:", error);
          } else {
            console.log(`Message ${statusUpdate.id} status updated to ${statusUpdate.status}`);
          }
        }
        return new Response("STATUS_UPDATED", { status: 200, headers: corsHeaders });
      }

      // --- 2. Handle New Incoming Messages ---
      const messages = value?.messages;
      const contacts = value?.contacts;
      
      if (messages && messages.length > 0) {
        for (const message of messages) {
          console.log("Processing incoming message:", message);
          
          const senderPhone = message.from;
          const contactInfo = contacts?.find((c: any) => c.wa_id === senderPhone);
          const contactName = contactInfo?.profile?.name || senderPhone;

          // Get message content based on type
          let content = '';
          let messageType = 'text';
          
          if (message.type === 'text') {
            content = message.text?.body || '';
            messageType = 'text';
          } else if (message.type === 'image') {
            content = message.image?.caption || '[Image]';
            messageType = 'image';
          } else if (message.type === 'document') {
            content = message.document?.filename || '[Document]';
            messageType = 'document';
          } else if (message.type === 'audio') {
            content = '[Audio message]';
            messageType = 'text';
          } else if (message.type === 'video') {
            content = '[Video]';
            messageType = 'text';
          } else if (message.type === 'sticker') {
            content = '[Sticker]';
            messageType = 'text';
          } else if (message.type === 'location') {
            content = `[Location: ${message.location?.latitude}, ${message.location?.longitude}]`;
            messageType = 'text';
          } else if (message.type === 'contacts') {
            content = '[Contact card]';
            messageType = 'text';
          } else if (message.type === 'button') {
            content = message.button?.text || '[Button response]';
            messageType = 'text';
          } else if (message.type === 'interactive') {
            content = message.interactive?.button_reply?.title || 
                     message.interactive?.list_reply?.title || 
                     '[Interactive response]';
            messageType = 'text';
          }

          // 1. Find or create contact
          let { data: existingContact } = await supabaseServiceRole
            .from('contacts')
            .select('id, user_id')
            .eq('phone_number', senderPhone)
            .single();

          let contactId: string;
          let userId: string;

          if (existingContact) {
            contactId = existingContact.id;
            userId = existingContact.user_id;
            console.log("Found existing contact:", contactId);
          } else {
            // For new contacts, we need to assign them to a user
            // Get the first admin user or the user with whatsapp settings configured
            const { data: whatsappSettings } = await supabaseServiceRole
              .from('whatsapp_settings')
              .select('user_id')
              .limit(1)
              .single();

            if (!whatsappSettings) {
              console.error("No WhatsApp settings found - cannot assign contact");
              return new Response("NO_SETTINGS", { status: 200, headers: corsHeaders });
            }

            userId = whatsappSettings.user_id;

            // Create new contact
            const { data: newContact, error: contactError } = await supabaseServiceRole
              .from('contacts')
              .insert({
                user_id: userId,
                phone_number: senderPhone,
                name: contactName,
              })
              .select()
              .single();

            if (contactError) {
              console.error("Error creating contact:", contactError);
              return new Response("CONTACT_ERROR", { status: 200, headers: corsHeaders });
            }

            contactId = newContact.id;
            console.log("Created new contact:", contactId);
          }

          // 2. Find or create conversation
          let { data: existingConversation } = await supabaseServiceRole
            .from('conversations')
            .select('id')
            .eq('contact_id', contactId)
            .single();

          let conversationId: string;

          if (existingConversation) {
            conversationId = existingConversation.id;
            console.log("Found existing conversation:", conversationId);
            
            // Update conversation - increment unread count
            const { data: convData } = await supabaseServiceRole
              .from('conversations')
              .select('unread_count')
              .eq('id', conversationId)
              .single();
            
            await supabaseServiceRole
              .from('conversations')
              .update({ 
                last_message_at: new Date().toISOString(),
                unread_count: (convData?.unread_count || 0) + 1,
                status: 'active'
              })
              .eq('id', conversationId);
          } else {
            // Create new conversation
            const { data: newConversation, error: convError } = await supabaseServiceRole
              .from('conversations')
              .insert({
                user_id: userId,
                contact_id: contactId,
                status: 'active',
                unread_count: 1,
                last_message_at: new Date().toISOString()
              })
              .select()
              .single();

            if (convError) {
              console.error("Error creating conversation:", convError);
              return new Response("CONVERSATION_ERROR", { status: 200, headers: corsHeaders });
            }

            conversationId = newConversation.id;
            console.log("Created new conversation:", conversationId);
          }

          // 3. Save the message
          const { error: msgError } = await supabaseServiceRole
            .from('messages')
            .insert({
              conversation_id: conversationId,
              whatsapp_message_id: message.id,
              content: content,
              direction: 'inbound',
              message_type: messageType,
              status: 'received'
            });

          if (msgError) {
            console.error("Error saving message:", msgError);
          } else {
            console.log("Message saved successfully for conversation:", conversationId);
          }
        }
        
        return new Response("MESSAGE_PROCESSED", { status: 200, headers: corsHeaders });
      }

      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    }

    // --- Dashboard API Actions (requires auth) ---
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Get user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseServiceRole.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const { action, ...params } = payload;

    // Handle different dashboard actions
    switch (action) {
      case 'check_connection': {
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token')
          .eq('user_id', user.id)
          .single();

        return new Response(JSON.stringify({
          connected: !!(settings?.phone_number_id && settings?.access_token),
          has_token: !!settings?.access_token,
          has_phone_number_id: !!settings?.phone_number_id
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'save_access_token': {
        const { access_token } = params;
        
        const { error } = await supabaseServiceRole
          .from('whatsapp_settings')
          .upsert({
            user_id: user.id,
            access_token: access_token,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'send_message': {
        const { to, message, template_name, template_params } = params;
        
        // Get user's WhatsApp settings
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Build message payload
        let messagePayload: any = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
        };

        if (template_name) {
          messagePayload.type = 'template';
          messagePayload.template = {
            name: template_name,
            language: { code: 'en' },
            components: template_params || []
          };
        } else {
          messagePayload.type = 'text';
          messagePayload.text = { body: message };
        }

        // Send via WhatsApp API
        const response = await fetch(
          `https://graph.facebook.com/v18.0/${settings.phone_number_id}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagePayload),
          }
        );

        const result = await response.json();
        console.log("WhatsApp API response:", result);

        if (!response.ok) {
          return new Response(JSON.stringify({ error: result.error?.message || 'Failed to send message' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message_id: result.messages?.[0]?.id 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  }

  return new Response("Not Found", { status: 404, headers: corsHeaders });
});