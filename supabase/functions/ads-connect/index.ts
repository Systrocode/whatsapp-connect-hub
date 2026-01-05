// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

declare const Deno: any;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

    try {
        const { code } = await req.json()

        console.log("Exchanging code for token...");

        const tokenResponse = await fetch(
            `https://graph.facebook.com/v21.0/oauth/access_token?` +
            `client_id=${Deno.env.get('META_APP_ID')}&` +
            `client_secret=${Deno.env.get('META_APP_SECRET')}&` +
            `code=${code}` +
            `&redirect_uri=${req.headers.get('origin')}/dashboard/ads` // Usually generic or empty for SDK login? SDK login via code doesn't strictly need redirect_uri if using postmessage flow, but sometimes it does.
            // Actually, FB.login with response_type='code' usually works without redirect_uri or with current page.
            // I'll omit redirect_uri initially or use '' if it fails.
        );

        // Note: For SDK generated codes, redirect_uri usually needs to match or be empty.
        // I will try WITHOUT redirect_uri first.

        const tokenData = await tokenResponse.json();
        console.log("Token response:", tokenData);

        const { access_token, error: tokenError } = tokenData;
        if (tokenError) throw new Error(tokenError.message || 'Token exchange failed');

        // Get First Ad Account (MVP)
        const adAccountsResponse = await fetch(
            `https://graph.facebook.com/v21.0/me/adaccounts?access_token=${access_token}&fields=id,name,account_id`
        );
        const adAccountsData = await adAccountsResponse.json();
        const adAccounts = adAccountsData.data || [];
        const firstAdAccount = adAccounts.length > 0 ? adAccounts[0].id : null;

        // Save to DB
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        const authHeader = req.headers.get('Authorization')!
        const userToken = authHeader.replace('Bearer ', '')
        const { data: { user } } = await supabaseAdmin.auth.getUser(userToken)

        if (!user) throw new Error('User not found');

        const { error: dbError } = await supabaseAdmin
            .from('whatsapp_settings')
            .upsert({
                user_id: user.id,
                fb_user_access_token: access_token,
                ad_account_id: firstAdAccount,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

        if (dbError) throw dbError

        return new Response(JSON.stringify({ success: true, ad_account_id: firstAdAccount }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
