
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

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTemplates() {
    console.log("Checking message_templates table...");

    const { data: templates, error } = await supabase
        .from('message_templates')
        .select('*');

    if (error) {
        console.error("Error fetching templates:", error);
    } else {
        console.log(`Found ${templates.length} templates.`);
        if (templates.length > 0) {
            templates.forEach(t => console.log(`- ${t.name} (${t.status})`));
        } else {
            console.log("No templates found. User needs to sync templates or create one.");
        }
    }

    console.log("\nChecking recent messages...");
    const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (messages) {
        messages.forEach(m => {
            console.log(`- [${m.direction}] Type: ${m.message_type}, Status: ${m.status}, Content: ${m.content.substring(0, 50)}`);
        });
    }
}

checkTemplates();
