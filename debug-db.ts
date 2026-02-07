
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach((line: string) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
            process.env[key] = value;
        }
    });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function log(message: string) {
    console.log(message);
    fs.appendFileSync('debug_output.txt', message + '\n');
}

async function debugData() {
    // Clear previous log
    fs.writeFileSync('debug_output.txt', '');

    log("--- DEBUGGING DATA ---");

    // 1. Fetch all users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) log(`Auth Error: ${authError.message}`);
    log(`Found ${users?.length || 0} users.`);
    const userId = users?.[0]?.id;
    log(`First User ID: ${userId}`);

    // 2. Fetch WhatsApp Settings
    const { data: settings } = await supabase.from('whatsapp_settings').select('*');
    log(`\nWhatsApp Settings: ${JSON.stringify(settings, null, 2)}`);

    // 3. Fetch Contacts
    const { data: contacts } = await supabase.from('contacts').select('*');
    log(`\nFound ${contacts?.length} contacts.`);
    if (contacts?.length) log(`Sample Contact: ${JSON.stringify(contacts[0])}`);

    // 4. Fetch Conversations
    const { data: conversations } = await supabase.from('conversations').select('*');
    log(`\nFound ${conversations?.length} conversations.`);
    if (conversations?.length) log(`Sample Conv: ${JSON.stringify(conversations[0])}`);

    // 5. Fetch Messages
    const { data: messages } = await supabase.from('messages').select('*');
    log(`\nFound ${messages?.length} messages.`);
    if (messages?.length) log(`Sample Message: ${JSON.stringify(messages[0])}`);

    // Check specific linkage
    if (conversations?.length && messages?.length) {
        const convoId = conversations[0].id;
        const msgsInConvo = messages.filter(m => m.conversation_id === convoId);
        log(`\nMessages in first conversation (${convoId}): ${msgsInConvo.length}`);
    }
}

debugData();
