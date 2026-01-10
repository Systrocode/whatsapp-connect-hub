// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Webhook verify token - should match what you set in Meta Dashboard
const VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN') || "your_chosen_secret_verify_token";

serve(async (req: Request) => {
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
    let payload: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        payload[key] = value;
      }
    } else {
      payload = await req.json();
    }
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
            // Store metadata in content field as JSON string
            content = JSON.stringify({
              caption: message.image?.caption || '',
              image: message.image // contains id, mine_type, sha256
            });
            messageType = 'image';
          } else if (message.type === 'document') {
            content = JSON.stringify({
              filename: message.document?.filename || '',
              document: message.document
            });
            messageType = 'document';
          } else if (message.type === 'audio') {
            content = JSON.stringify({ audio: message.audio });
            messageType = 'text'; // or 'audio' if supported by DB enum, but sticking to text for safety or keeping it
          } else if (message.type === 'video') {
            content = JSON.stringify({ video: message.video });
            messageType = 'text';
          } else if (message.type === 'sticker') {
            content = JSON.stringify({ sticker: message.sticker });
            messageType = 'text';
          } else if (message.type === 'location') {
            content = JSON.stringify({ location: message.location });
            messageType = 'text';
          } else if (message.type === 'contacts') {
            content = JSON.stringify({ contacts: message.contacts });
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
          const phoneNumberId = value?.metadata?.phone_number_id;

          // Find the user who owns this WhatsApp number
          let userId: string | null = null;
          let accessToken: string | null = null;

          if (phoneNumberId) {
            const { data: whatsappSettings } = await supabaseServiceRole
              .from('whatsapp_settings')
              .select('user_id, access_token:access_token_encrypted')
              .eq('phone_number_id', phoneNumberId)
              .single();

            if (whatsappSettings) {
              userId = whatsappSettings.user_id;
              accessToken = whatsappSettings.access_token;
              console.log("Found user for phone_number_id:", phoneNumberId, "User ID:", userId);
            }
          }

          if (!userId) {
            console.log("No user found by phone_number_id, trying fallback...");
            const { data: whatsappSettings } = await supabaseServiceRole
              .from('whatsapp_settings')
              .select('user_id, access_token:access_token_encrypted')
              .limit(1)
              .single();

            if (!whatsappSettings) {
              console.error("No WhatsApp settings found - cannot assign contact");
              return new Response("NO_SETTINGS", { status: 200, headers: corsHeaders });
            }
            userId = whatsappSettings.user_id;
            accessToken = whatsappSettings.access_token;
          }

          // Search for contact - checking with and without '+' prefix
          // This handles cases where user saved contact as "+123..." but webhook sends "123..."
          const { data: existingContacts } = await supabaseServiceRole
            .from('contacts')
            .select('id, user_id, phone_number')
            .eq('user_id', userId)
            .or(`phone_number.eq.${senderPhone},phone_number.eq.+${senderPhone}`);

          const existingContact = existingContacts?.[0];

          let contactId: string;

          if (existingContact) {
            contactId = existingContact.id;
            console.log("Found existing contact:", contactId);
          } else {
            // Create new contact
            const { data: newContact, error: contactError } = await supabaseServiceRole
              .from('contacts')
              .insert({
                user_id: userId,
                phone_number: senderPhone, // Save exactly as received from WhatsApp
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
          const { data: existingConversation } = await supabaseServiceRole
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
              status: 'delivered', // Using 'delivered' as 'received' is not in allowed DB status enum
            });

          if (msgError) {
            console.error("Error saving message:", msgError);
          } else {
            console.log("Message saved successfully for conversation:", conversationId);

            // 4. Trigger Automation Flows
            if (messageType === 'text' && accessToken) {
              // Fetch active flows
              const { data: flows } = await supabaseServiceRole
                .from('flows')
                .select('*')
                .eq('user_id', userId)
                .eq('is_active', true);

              if (flows && flows.length > 0) {
                for (const flow of flows) {
                  // Check trigger
                  if (flow.trigger_keywords && flow.trigger_keywords.some((k: string) => content.toLowerCase().includes(k.toLowerCase()))) {
                    console.log(`Triggering Flow: ${flow.name}`);

                    // Naive Flow Execution: Find the first 'message' node
                    // TODO: Implement full graph traversal (Trigger -> Next Node)
                    const messageNode = flow.data?.nodes?.find((n: any) => n.type === 'message' || n.type === 'messageNode');

                    if (messageNode && messageNode.data?.content) {
                      const responseText = messageNode.data.content;

                      // Send Response
                      const replyRes = await fetch(
                        `https://graph.facebook.com/v21.0/${value.metadata.phone_number_id}/messages`,
                        {
                          method: 'POST',
                          headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            messaging_product: 'whatsapp',
                            to: senderPhone,
                            type: 'text',
                            text: { body: responseText }
                          }),
                        }
                      );

                      if (replyRes.ok) {
                        const replyJson = await replyRes.json();
                        // Save Bot Reply to DB
                        await supabaseServiceRole.from('messages').insert({
                          conversation_id: conversationId,
                          whatsapp_message_id: replyJson.messages?.[0]?.id,
                          content: responseText,
                          direction: 'outbound',
                          message_type: 'text',
                          status: 'sent'
                        });
                        console.log(`Flow reply sent: ${responseText}`);
                      } else {
                        console.error("Failed to send flow reply");
                      }
                    }
                  }
                }
              }
            }
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
      case 'get_media': {
        const { media_id } = params;
        if (!media_id) {
          return new Response(JSON.stringify({ error: 'Missing media_id' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Get user settings
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not connected' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 1. Get Media URL
        const mediaRes = await fetch(`https://graph.facebook.com/v21.0/${media_id}`, {
          headers: { 'Authorization': `Bearer ${settings.access_token}` }
        });
        const mediaJson = await mediaRes.json();

        if (!mediaRes.ok) {
          console.error('Meta API Error:', mediaJson);
          return new Response(JSON.stringify({ error: mediaJson.error?.message || 'Failed to get media info' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const downloadUrl = mediaJson.url;

        // 2. Download Media with Manual Redirect handling
        // CDNs often reject the Authorization header, so we must strip it on redirect
        let fileRes = await fetch(downloadUrl, {
          headers: { 'Authorization': `Bearer ${settings.access_token}` },
          redirect: 'manual'
        });

        if (fileRes.status === 301 || fileRes.status === 302) {
          const location = fileRes.headers.get('Location');
          if (!location) {
            return new Response(JSON.stringify({ error: 'Redirect location missing' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          // Follow redirect WITHOUT Authorization header
          fileRes = await fetch(location);
        }

        if (!fileRes.ok) {
          console.error('Media Download Error status:', fileRes.status);
          return new Response(JSON.stringify({ error: 'Failed to download media file' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const blob = await fileRes.blob();

        return new Response(blob, {
          headers: {
            ...corsHeaders,
            'Content-Type': fileRes.headers.get('Content-Type') || 'application/octet-stream',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }

      case 'check_connection': {
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
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
            access_token_encrypted: access_token,
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
        const { to, message, template_name, template_params, type = 'text', media_url, caption, filename } = params;

        // Get user's WhatsApp settings
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Build message payload
        const messagePayload: any = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to.replace(/\D/g, ''), // Remove non-numeric chars (like + or spaces)
        };

        if (template_name) {
          messagePayload.type = 'template';
          messagePayload.template = {
            name: template_name,
            language: { code: params.language_code || 'en_US' },
            components: template_params || []
          };
        } else if (type === 'image') {
          messagePayload.type = 'image';
          messagePayload.image = { link: media_url, caption: caption || message };
        } else if (type === 'audio') {
          messagePayload.type = 'audio';
          messagePayload.audio = { link: media_url };
        } else if (type === 'video') {
          messagePayload.type = 'video';
          messagePayload.video = { link: media_url, caption: caption || message };
        } else if (type === 'document') {
          messagePayload.type = 'document';
          messagePayload.document = { link: media_url, caption: caption || message, filename: filename || 'document' };
        } else {
          messagePayload.type = 'text';
          messagePayload.text = { body: message };
        }

        // Send via WhatsApp API
        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/messages`,
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

        // --- Save to Database ---
        try {
          // 1. Find or create contact
          const { data: existingContact } = await supabaseServiceRole
            .from('contacts')
            .select('id')
            .eq('phone_number', to)
            .eq('user_id', user.id) // Ensure we search within the current user's contacts
            .single();

          let contactId: string;

          if (existingContact) {
            contactId = existingContact.id;
          } else {
            // Create new contact
            const { data: newContact, error: contactError } = await supabaseServiceRole
              .from('contacts')
              .insert({
                user_id: user.id,
                phone_number: to,
                name: to, // Default name to phone number
              })
              .select()
              .single();

            if (contactError) throw contactError;
            contactId = newContact.id;
          }

          // 2. Find or create conversation
          const { data: existingConversation } = await supabaseServiceRole
            .from('conversations')
            .select('id')
            .eq('contact_id', contactId)
            .eq('user_id', user.id)
            .single();

          let conversationId: string;

          if (existingConversation) {
            conversationId = existingConversation.id;
            // Update last_message_at
            await supabaseServiceRole
              .from('conversations')
              .update({ last_message_at: new Date().toISOString() })
              .eq('id', conversationId);
          } else {
            // Create new conversation
            const { data: newConversation, error: convError } = await supabaseServiceRole
              .from('conversations')
              .insert({
                user_id: user.id,
                contact_id: contactId,
                status: 'active',
                last_message_at: new Date().toISOString()
              })
              .select()
              .single();

            if (convError) throw convError;
            conversationId = newConversation.id;
          }

          // 3. Save the message
          let dbContent = message || (template_name ? `Template: ${template_name}` : '');

          if (['image', 'video', 'audio', 'document'].includes(type) && media_url) {
            dbContent = JSON.stringify({
              [type]: { link: media_url },
              caption: caption || message,
              filename: filename
            });
          }

          const { error: insertError } = await supabaseServiceRole
            .from('messages')
            .insert({
              conversation_id: conversationId,
              whatsapp_message_id: result.messages?.[0]?.id,
              content: dbContent,
              direction: 'outbound',
              message_type: template_name ? 'template' : type,
              status: 'sent'
            });

          if (insertError) {
            console.error("Supabase Insert Error:", insertError);
            throw insertError;
          }

        } catch (dbError) {
          console.error("Error saving sent message to DB:", dbError);
          return new Response(JSON.stringify({
            error: 'Message sent but failed to save to history',
            details: dbError
          }), {
            status: 500,
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

      case 'get_business_profile': {
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/whatsapp_business_profile?fields=about,address,description,email,websites,profile_picture_url,vertical`,
          {
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('Meta API Error:', data.error);
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(data.data?.[0] || {}), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update_business_profile': {
        const { about, address, description, email, websites, vertical } = params;

        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const payload: any = {
          messaging_product: 'whatsapp',
          about,
          address,
          description,
          email,
          websites,
          vertical
        };

        // Filter out undefined/empty values to avoid overwriting with null
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/whatsapp_business_profile`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('Meta API Error:', data.error);
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update_profile_photo': {
        const file = payload.file;

        if (!file || !(file instanceof File)) {
          return new Response(JSON.stringify({ error: 'No file uploaded' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted, business_account_id')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const appId = Deno.env.get('META_APP_ID');

        // 1. Start Upload Session
        const startSessionUrl = new URL(`https://graph.facebook.com/v21.0/${appId || 'app'}/uploads`);
        startSessionUrl.searchParams.append('file_length', String(file.size));
        startSessionUrl.searchParams.append('file_type', file.type);

        const sessionRes = await fetch(startSessionUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${settings.access_token}`
          }
        });

        const sessionData = await sessionRes.json();

        if (!sessionRes.ok) {
          console.error("Upload Session Error:", sessionData);
          return new Response(JSON.stringify({ error: sessionData.error?.message || 'Failed to start upload session' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const uploadSessionId = sessionData.id;

        // 2. Upload File Content
        const fileContent = await file.arrayBuffer();

        const uploadRes = await fetch(`https://graph.facebook.com/v21.0/${uploadSessionId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${settings.access_token}`,
            'file_offset': '0'
          },
          body: fileContent
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          console.error("File Upload Error:", uploadData);
          return new Response(JSON.stringify({ error: uploadData.error?.message || 'Failed to upload file content' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const fileHandle = uploadData.h;

        // 3. Update Business Profile with Handle
        const profileRes = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/whatsapp_business_profile`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              profile_picture_handle: fileHandle
            })
          }
        );

        const profileData = await profileRes.json();

        if (profileData.error) {
          console.error("Profile Picture Update Error:", profileData);
          return new Response(JSON.stringify({ error: profileData.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_automation_config': {
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/conversational_automation`,
          {
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
            },
          }
        );

        const data = await response.json();

        if (data.error) {
          // Meta returns error if no config exists yet, we should simpler return empty defaults
          console.warn('Meta API Warning (get automation):', data.error);
          return new Response(JSON.stringify({
            ice_breakers: [],
            commands: [],
            enable_welcome_message: false
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify(data.data?.[0] || {}), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update_automation_config': {
        const { ice_breakers, commands, enable_welcome_message } = params;

        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const payload: any = {
          enable_welcome_message: !!enable_welcome_message,
        };

        if (ice_breakers && Array.isArray(ice_breakers)) {
          payload.ice_breakers = ice_breakers;
        }

        if (commands && Array.isArray(commands)) {
          payload.commands = commands;
        }

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}/conversational_automation`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('Meta API Error:', data.error);
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'sync_templates': {
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('business_account_id, access_token:access_token_encrypted, user_id')
          .eq('user_id', user.id)
          .single();

        if (!settings?.business_account_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'WhatsApp not configured (Missing WABA ID or Token)' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const wabaId = settings.business_account_id;

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${wabaId}/message_templates?limit=100`,
          {
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
            }
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('Meta Template Fetch Error:', data.error);
          return new Response(JSON.stringify({ error: data.error.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const templates = data.data || [];
        let count = 0;

        // Get existing templates to map IDs if name matches
        const { data: existingTemplates } = await supabaseServiceRole
          .from('message_templates')
          .select('id, name')
          .eq('user_id', settings.user_id);

        const nameToId = new Map(existingTemplates?.map((t: any) => [t.name, t.id]));

        for (const t of templates) {
          const bodyComponent = t.components.find((c: any) => c.type === 'BODY');
          const content = bodyComponent?.text || '';
          const isApproved = t.status === 'APPROVED';

          // Skip if no content (e.g. only header/footer templates? rare)
          if (!content) continue;

          const payload: any = {
            user_id: settings.user_id,
            name: t.name,
            category: t.category,
            content: content,
            is_approved: isApproved,
            variables: [], // TODO: Parse variables
            updated_at: new Date().toISOString()
          };

          // Parse Basic Variables {{1}}
          const varMatches = content.match(/\{\{\d+\}\}/g);
          if (varMatches) {
            payload.variables = [...new Set(varMatches)]; // unique vars
          }

          const existingId = nameToId.get(t.name);
          let error;

          if (existingId) {
            const res = await supabaseServiceRole
              .from('message_templates')
              .update(payload)
              .eq('id', existingId);
            error = res.error;
          } else {
            const res = await supabaseServiceRole
              .from('message_templates')
              .insert(payload);
            error = res.error;
          }

          if (!error) count++;
          else console.error('Template upsert error:', error);
        }

        return new Response(JSON.stringify({ success: true, count: count, total_fetched: templates.length }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_status': {
        // Get settings
        const { data: settings } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token:access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (!settings?.phone_number_id || !settings?.access_token) {
          return new Response(JSON.stringify({ error: 'Not configured' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const response = await fetch(
          `https://graph.facebook.com/v21.0/${settings.phone_number_id}?fields=quality_rating,status,messaging_limit_tier`,
          {
            headers: {
              'Authorization': `Bearer ${settings.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('WhatsApp API Error:', data.error);
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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