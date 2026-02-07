
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

// Prefer SERVICE_ROLE_KEY if available for full access
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_KEY");
    console.log("Keys found:", Object.keys(env));
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConversation() {
    const conversationId = 'c0bd992c-bd5a-4dd5-b6c1-bbca96964289';
    console.log(`Checking conversation: ${conversationId}`);

    // 1. Get Conversation Details
    const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

    if (convError) {
        console.error('Error fetching conversation:', convError);
    } else {
        console.log('Conversation found:', conversation);
    }

    // 2. Get Messages
    const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId);

    if (msgError) {
        console.error('Error fetching messages:', msgError);
    } else {
        console.log(`Messages found: ${messages.length}`);
        if (messages.length > 0) {
            console.log('Sample message:', messages[0]);
        }
    }
}

checkConversation();
