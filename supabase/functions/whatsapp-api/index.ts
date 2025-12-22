import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth context
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Failed to get user:', userError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, ...params } = await req.json();
    console.log(`WhatsApp API action: ${action} for user: ${user.id}`);

    switch (action) {
      case 'save_access_token': {
        // Save the access token securely - only accessible server-side
        const { access_token } = params;
        if (!access_token) {
          return new Response(
            JSON.stringify({ error: 'Access token is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Use service role to update the encrypted token
        const supabaseServiceRole = createClient(
          supabaseUrl,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        // Check if settings exist
        const { data: existing } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (existing) {
          const { error: updateError } = await supabaseServiceRole
            .from('whatsapp_settings')
            .update({ 
              access_token_encrypted: access_token,
              is_connected: true,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id);

          if (updateError) {
            console.error('Failed to update access token:', updateError.message);
            throw updateError;
          }
        } else {
          const { error: insertError } = await supabaseServiceRole
            .from('whatsapp_settings')
            .insert({
              user_id: user.id,
              access_token_encrypted: access_token,
              is_connected: true
            });

          if (insertError) {
            console.error('Failed to insert access token:', insertError.message);
            throw insertError;
          }
        }

        console.log('Access token saved successfully for user:', user.id);
        return new Response(
          JSON.stringify({ success: true, message: 'Access token saved securely' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'send_message': {
        // Send a WhatsApp message using stored credentials
        const { to, message, template_name, template_params } = params;

        // Get user's WhatsApp settings using service role to access token
        const supabaseServiceRole = createClient(
          supabaseUrl,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        const { data: settings, error: settingsError } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, access_token_encrypted, is_connected')
          .eq('user_id', user.id)
          .single();

        if (settingsError || !settings) {
          console.error('WhatsApp settings not found:', settingsError?.message);
          return new Response(
            JSON.stringify({ error: 'WhatsApp settings not configured' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!settings.is_connected || !settings.access_token_encrypted || !settings.phone_number_id) {
          return new Response(
            JSON.stringify({ error: 'WhatsApp is not fully configured. Please add your access token and phone number ID.' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Build the WhatsApp API request
        const whatsappUrl = `https://graph.facebook.com/v18.0/${settings.phone_number_id}/messages`;
        
        let messagePayload: Record<string, unknown>;
        
        if (template_name) {
          // Template message
          messagePayload = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'template',
            template: {
              name: template_name,
              language: { code: 'en' },
              components: template_params || []
            }
          };
        } else {
          // Text message
          messagePayload = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'text',
            text: { body: message }
          };
        }

        console.log('Sending WhatsApp message to:', to);
        
        const whatsappResponse = await fetch(whatsappUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${settings.access_token_encrypted}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messagePayload)
        });

        const whatsappResult = await whatsappResponse.json();

        if (!whatsappResponse.ok) {
          console.error('WhatsApp API error:', whatsappResult);
          return new Response(
            JSON.stringify({ error: 'Failed to send message', details: whatsappResult }),
            { status: whatsappResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('WhatsApp message sent successfully:', whatsappResult);
        return new Response(
          JSON.stringify({ success: true, result: whatsappResult }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'check_connection': {
        // Check if WhatsApp is properly configured (without exposing token)
        const supabaseServiceRole = createClient(
          supabaseUrl,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        const { data: settings, error: settingsError } = await supabaseServiceRole
          .from('whatsapp_settings')
          .select('phone_number_id, is_connected, access_token_encrypted')
          .eq('user_id', user.id)
          .single();

        if (settingsError) {
          return new Response(
            JSON.stringify({ 
              connected: false, 
              has_token: false,
              has_phone_number_id: false
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ 
            connected: settings?.is_connected || false,
            has_token: !!settings?.access_token_encrypted,
            has_phone_number_id: !!settings?.phone_number_id
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('WhatsApp API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
