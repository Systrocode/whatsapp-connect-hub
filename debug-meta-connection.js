
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

console.log("Starting script...");
console.log("CWD:", process.cwd());

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        console.log("Reading .env from:", envPath);
        if (!fs.existsSync(envPath)) {
            console.error("File does not exist!");
            return {};
        }
        const content = fs.readFileSync(envPath, 'utf-8');
        console.log("File read success. Length:", content.length);

        const env = {};
        content.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const parts = trimmed.split('=');
                const key = parts[0]?.trim();
                const val = parts.slice(1).join('=').trim();
                if (key) env[key] = val.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
            }
        });
        console.log("Found keys:", Object.keys(env));
        return env;
    } catch (e) {
        console.error("Error reading .env:", e.message);
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

let credentials = [];

async function getDbCredentials() {
    if (!supabaseUrl || !supabaseKey) {
        console.log("⚠️  Skipping DB check: SUPABASE_SERVICE_ROLE_KEY not found in .env");
        return null;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
        console.log("Auth Error:", authError.message);
        return null;
    }

    if (!users?.length) {
        console.log("No users found.");
        return null;
    }

    const userId = users[0].id;
    const { data: settings } = await supabase
        .from('whatsapp_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (settings) {
        return {
            source: 'Database (User 1)',
            phoneId: settings.phone_number_id,
            token: settings.access_token_encrypted
        };
    }
    return null;
}

async function checkMetaConnection() {
    console.log("--- CHECKING META API CONNECTION ---");

    // 1. Try to get DB credentials
    try {
        const dbCreds = await getDbCredentials();
        if (dbCreds) credentials.push(dbCreds);
    } catch (e) {
        console.log("Error getting DB creds:", e.message);
    }

    // 2. Get Env credentials
    if (env.VITE_W_PHONE_ID && env.VITE_W_TOKEN) {
        credentials.push({
            source: '.env File',
            phoneId: env.VITE_W_PHONE_ID,
            token: env.VITE_W_TOKEN
        });
    }

    if (credentials.length === 0) {
        console.error("❌ No credentials found to test (neither in DB nor .env).");
        return;
    }

    for (const cred of credentials) {
        console.log(`\nTesting Credentials from: ${cred.source}`);
        console.log(`Phone ID: ${cred.phoneId}`);
        console.log(`Token:    ${cred.token ? cred.token.substring(0, 10) + '...' : 'Missing'}`);

        if (!cred.phoneId || !cred.token) {
            console.error("❌ Missing fields, skipping.");
            continue;
        }

        // Test 1
        try {
            const url = `https://graph.facebook.com/v18.0/${cred.phoneId}?fields=display_phone_number,quality_rating,verified_name,code_verification_status`;
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${cred.token}` }
            });
            const data = await response.json();

            if (!response.ok) {
                console.error(`❌ Phone Info Check Failed: ${data.error?.message || JSON.stringify(data.error)}`);
            } else {
                console.log(`✅ Phone Info: ${data.display_phone_number} | ${data.verified_name} | Status: ${data.code_verification_status}`);
            }
        } catch (e) {
            console.error("Request Failed:", e.message);
        }

        // Test 2
        try {
            const url = `https://graph.facebook.com/v18.0/${cred.phoneId}/whatsapp_business_profile?fields=about,address,description,email`;
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${cred.token}` }
            });
            const data = await response.json();

            if (!response.ok) {
                console.error(`❌ Business Profile Check Failed: ${data.error?.message || JSON.stringify(data.error)}`);
            } else {
                console.log(`✅ Business Profile Access: Authorized`);
            }
        } catch (e) { console.error("Request Failed:", e.message); }
    }
}

checkMetaConnection();
