import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
    // 1. Fetch Users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
        console.error("Auth Error:", authError);
        return;
    }
    
    console.log("All users:");
    for (const u of users) {
        console.log(`- ID: ${u.id}, Email: ${u.email}, Meta:`, u.user_metadata);
    }
    
    // 2. Fetch whatsapp_settings
    const { data: settings, error: setErr } = await supabase.from('whatsapp_settings').select('*');
    if (setErr) {
        console.error("Settings Error:", setErr);
        return;
    }
    console.log("\nWhatsApp Settings:");
    console.dir(settings, { depth: null });
    
    // 3. Let's see clients table if there is one
    const { data: clients, error: cliErr } = await supabase.from('clients').select('*');
    if (cliErr) {
        console.error("Clients Table Error:", cliErr.message);
    } else {
        console.log("\nClients:");
        console.dir(clients, { depth: null });
    }
}
debug();
