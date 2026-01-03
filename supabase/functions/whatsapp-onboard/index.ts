import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS for Browser Invocations
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { code, waba_id, phone_id } = await req.json()

    // 2. Exchange 'code' for a permanent access token via Meta Graph API
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?` +
      `client_id=${Deno.env.get('META_APP_ID')}&` +
      `client_secret=${Deno.env.get('META_APP_SECRET')}&` +
      `code=${code}`
    );

    const { access_token, error: tokenError } = await tokenResponse.json();
    if (tokenError) throw new Response(JSON.stringify(tokenError), { status: 400 })

    // 3. Initialize Supabase Admin Client (to bypass RLS for insertion)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 4. Get the ID of the user who triggered the function
    const authHeader = req.headers.get('Authorization')!
    const userToken = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseAdmin.auth.getUser(userToken)

    // 5. Insert the connection into your settings table
    const { error: dbError } = await supabaseAdmin
      .from('whatsapp_settings')
      .upsert({
        user_id: user?.id,
        business_account_id: waba_id,
        phone_number_id: phone_id,
        access_token_encrypted: access_token,
        is_connected: true,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (dbError) throw dbError

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})