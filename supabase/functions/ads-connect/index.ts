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
        const { access_token: shortLivedToken } = await req.json();

        console.log("Exchanging short-lived token for long-lived token...");

        const tokenResponse = await fetch(
            `https://graph.facebook.com/v21.0/oauth/access_token?` +
            `grant_type=fb_exchange_token&` +
            `client_id=${Deno.env.get('META_APP_ID')}&` +
            `client_secret=${Deno.env.get('META_APP_SECRET')}&` +
            `fb_exchange_token=${shortLivedToken}`
        );

        const tokenData = await tokenResponse.json();
        console.log("Token response:", tokenData);

        const { access_token, error: tokenError } = tokenData;
        if (tokenError) {
            console.error("Token Error:", JSON.stringify(tokenError));
            throw new Error(tokenError.message || 'Token exchange failed');
        }

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
            status: 200, // Return 200 with error body so client parses it
        })
    }
})
