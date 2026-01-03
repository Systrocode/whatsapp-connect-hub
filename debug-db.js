
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function log(message) {
    console.log(message);
    try {
        fs.appendFileSync('debug_output.txt', message + '\n');
    } catch (e) {
        console.error("Error writing to file:", e);
    }
}

async function debugData() {
    try {
        fs.writeFileSync('debug_output.txt', '');
    } catch (e) { }

    log("--- DEBUGGING DATA (JS) ---");

    // 1. Fetch Users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) log(`Auth Error: ${authError.message}`);
    log(`Found ${users?.length || 0} users.`);
    if (users?.[0]) log(`First User ID: ${users[0].id}`);

    // 2. Converations
    const { data: conversations } = await supabase.from('conversations').select('*');
    log(`\nFound ${conversations?.length} conversations.`);
    if (conversations?.length) log(`First Conversation: ${JSON.stringify(conversations[0])}`);

    // 3. Messages
    const { data: messages } = await supabase.from('messages').select('*');
    log(`\nFound ${messages?.length} messages.`);
    if (messages?.length) log(`First Message: ${JSON.stringify(messages[0])}`);
}

debugData();
