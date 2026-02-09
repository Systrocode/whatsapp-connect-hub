
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // MUST use Service Role to delete users
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        // Get the user from the auth context (the user initiating the request)
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        // 1. Delete user from 'auth.users'
        // With Supabase, deleting from auth.users usually cascades to public tables
        // IF the RLS/Foreign Keys are set up with ON DELETE CASCADE.
        // Based on our previous migrations, most tables should cascade.

        // We need to use the admin API to delete the user
        // Re-initialize client with ONLY service role key to get admin access
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
            user.id
        );

        if (deleteError) {
            console.error('Error deleting user:', deleteError);
            throw deleteError;
        }

        return new Response(
            JSON.stringify({ message: 'Account deleted successfully' }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
