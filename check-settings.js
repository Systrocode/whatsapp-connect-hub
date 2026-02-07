
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import dotenv from "npm:dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSettings() {
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) {
        console.error("Error fetching users", userError);
        return;
    }

    const userId = users.users[0].id;
    console.log("Checking settings for user:", userId);

    const { data: settings, error } = await supabase
        .from('whatsapp_settings')
        .select('*')
        .eq('user_id', userId);

    console.log("Settings found:", settings);
}

checkSettings();
