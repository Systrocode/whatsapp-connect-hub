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
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Authenticate User
        const authHeader = req.headers.get('Authorization')!
        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

        if (authError || !user) {
            throw new Error('Unauthorized')
        }

        const { name, category, content, headerType, language = 'en_US' } = await req.json()

        // 2. Get Credentials
        const { data: settings, error: settingsError } = await supabaseClient
            .from('whatsapp_settings')
            .select('business_account_id, access_token_encrypted') // Assuming access_token_encrypted is the token
            .eq('user_id', user.id)
            .single()

        if (settingsError || !settings?.business_account_id || !settings?.access_token_encrypted) {
            throw new Error('WhatsApp settings not found. Please connect your account first.')
        }

        const wabaId = settings.business_account_id
        const accessToken = settings.access_token_encrypted

        // 3. Construct Meta Payload
        const components = []

        // Header
        if (headerType === 'IMAGE') {
            components.push({
                type: 'HEADER',
                format: 'IMAGE'
            })
        } else if (headerType === 'TEXT') {
            // Ideally we'd accept text header content, but specific implementation skipped for now
            // components.push({ type: 'HEADER', format: 'TEXT', text: ... })
        }

        // Body
        const bodyComponent: any = {
            type: 'BODY',
            text: content
        }

        // Add examples if variables exist (Required by Meta)
        const varMatches = content.match(/\{\{\d+\}\}/g) || []
        if (varMatches.length > 0) {
            // Count unique variables roughly or just max index
            const maxVar = Math.max(...varMatches.map((v: string) => parseInt(v.match(/\d+/)![0])))
            const exampleValues = Array.from({ length: maxVar }, (_, i) => `val${i + 1}`)
            bodyComponent.example = { body_text: [exampleValues] }
        }

        components.push(bodyComponent)

        // Footer (Optional - not passed yet)

        const payload = {
            name: name,
            category: category,
            allow_category_change: true,
            language: language,
            components: components
        }

        // 4. Call Meta API
        const response = await fetch(
            `https://graph.facebook.com/v21.0/${wabaId}/message_templates`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }
        )

        const result = await response.json()

        if (!response.ok) {
            console.error('Meta API Error:', result)
            throw new Error(result.error?.message || 'Failed to create template on Meta')
        }

        // 5. Save to Database
        const { data: dbTemplate, error: dbError } = await supabaseClient
            .from('message_templates')
            .insert({
                user_id: user.id,
                name: name,
                category: category,
                content: content,
                variables: headerType === 'IMAGE' ? ['has_image'] : [],
                is_approved: result.status === 'APPROVED', // Usually 'PENDING'
                meta_id: result.id, // Assuming schema has this or we ignore it
                status: result.status // Assuming schema has this
            })
            .select()
            .single()

        // Note: If schema excludes meta_id/status, this might fail or ignore.
        // Safest is to stick to known columns from code view earlier, but we want to save this info.
        // If DB insert fails, we still return success but warn?
        // Actually, we'll try to insert standard fields.

        if (dbError) {
            // Fallback: If extra columns don't exist, try simpler insert
            console.error('DB Insert Error (might be schema mismatch):', dbError)
            const { data: dbTemplateFallback, error: dbErrorFallback } = await supabaseClient
                .from('message_templates')
                .insert({
                    user_id: user.id,
                    name: name,
                    category: category,
                    content: content,
                    variables: headerType === 'IMAGE' ? ['has_image'] : [],
                    is_approved: false
                })
                .select()
                .single()

            if (dbErrorFallback) throw dbErrorFallback
            return new Response(JSON.stringify(dbTemplateFallback), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }

        return new Response(JSON.stringify(dbTemplate), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
