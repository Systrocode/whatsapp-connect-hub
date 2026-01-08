
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

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

async function checkSettings() {
    console.log("Checking whatsapp_settings table...");

    const { data: settings, error } = await supabase
        .from('whatsapp_settings')
        .select('*');

    if (error) {
        console.error("Error fetching settings:", error);
    } else {
        console.log(`Found ${settings.length} settings records.`);
        if (settings.length > 0) {
            const s = settings[0];
            console.log("First Record:");
            console.log("  ID:", s.id);
            console.log("  Phone Number ID:", s.phone_number_id ? "Present (Starts with " + s.phone_number_id.substring(0, 4) + ")" : "Missing");
            console.log("  WABA ID:", s.business_account_id ? "Present" : "Missing");
            console.log("  Access Token:", s.access_token_encrypted ? "Present (Encrypted)" : "Missing");
            console.log("  Updated At:", s.updated_at);
        } else {
            console.log("No settings found in the database.");
        }
    }
}

checkSettings();
