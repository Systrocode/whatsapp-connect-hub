
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
const https = require('https');

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env');
const env = {};

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["']|["']$/g, '');
            env[key] = value;
        }
    });
}

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to fetch JSON
function fetchJson(url, token) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function syncTemplates() {
    console.log("Starting Template Sync...");

    // 1. Get Settings (User ID, WABA ID, Token)
    // We take the first user found or filtered if we knew the user. 
    // Let's assume single tenant or loop through all settings.
    const { data: allSettings, error } = await supabase.from('whatsapp_settings').select('*');

    if (error || !allSettings || allSettings.length === 0) {
        console.error("No WhatsApp settings found in DB.");
        return;
    }

    for (const settings of allSettings) {
        console.log(`Processing user ${settings.user_id}...`);

        if (!settings.business_account_id || !settings.access_token_encrypted) {
            console.log("  - Missing WABA ID or Token, skipping.");
            continue;
        }

        const wabaId = settings.business_account_id;
        const token = settings.access_token_encrypted;

        try {
            const url = `https://graph.facebook.com/v21.0/${wabaId}/message_templates?limit=100`;
            const data = await fetchJson(url, token);

            if (data.error) {
                console.error("  - Meta API Error:", data.error.message);
                continue;
            }

            const templates = data.data || [];
            console.log(`  - Found ${templates.length} templates from Meta.`);

            // Get existing to map ID
            const { data: existingRecords } = await supabase
                .from('message_templates')
                .select('id, name')
                .eq('user_id', settings.user_id);

            const nameToId = new Map(existingRecords.map(t => [t.name, t.id]));
            let upsertCount = 0;

            for (const t of templates) {
                const bodyComponent = t.components.find(c => c.type === 'BODY');
                const content = bodyComponent ? bodyComponent.text : '';

                if (!content) continue; // Skip if no body text?

                const isApproved = t.status === 'APPROVED';
                const variableMatches = content.match(/\{\{\d+\}\}/g);
                const variables = variableMatches ? [...new Set(variableMatches)] : [];

                const payload = {
                    user_id: settings.user_id,
                    name: t.name,
                    category: t.category,
                    content: content,
                    is_approved: isApproved,
                    variables: variables,
                    updated_at: new Date().toISOString()
                };

                const existingId = nameToId.get(t.name);

                if (existingId) {
                    await supabase.from('message_templates').update(payload).eq('id', existingId);
                } else {
                    await supabase.from('message_templates').insert(payload);
                }
                upsertCount++;
            }
            console.log(`  - Synced ${upsertCount} templates to DB.`);

        } catch (e) {
            console.error("  - Error syncing:", e);
        }
    }
}

syncTemplates();
