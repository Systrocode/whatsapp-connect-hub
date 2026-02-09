
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugData() {
    console.log("--- DEBUGGING DATA (JS) ---");

    // 1. Fetch Users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) console.log(`Auth Error: ${authError.message}`);
    console.log(`Found ${users?.length || 0} users.`);

    if (!users?.length) return;

    const userId = users[0].id;
    console.log(`First User ID: ${userId}`);

    // 2. Verify Conversation Exists
    const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

    if (convError) console.log("Conv Error:", convError);
    console.log(`Found ${conversations?.length} conversations.`);

    if (conversations?.length) {
        const conv = conversations[0];
        console.log(`Testing Insert into Conversation: ${conv.id}`);

        // 3. Try Service Role Insert (Simulate Edge Function)
        const { data: msg, error: msgError } = await supabase
            .from('messages')
            .insert({
                conversation_id: conv.id,
                content: "Debug Message via Script",
                direction: "outbound",
                status: "sent",
                message_type: "text",
                whatsapp_message_id: `debug-${Date.now()}`
            })
            .select();

        if (msgError) {
            console.error("Service Role Insert Error:", msgError);
        } else {
            console.log("Service Role Insert Success:", msg);
        }
    } else {
        console.log("No conversations found to test insert.");
    }
}

debugData();
