
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function debugAffiliates() {
    console.log('--- Debugging Affiliates ---')

    // 1. Check if ANY affiliates exist (bypass RLS)
    const { data: allAffiliates, error: dbError } = await supabase
        .from('affiliates')
        .select('*')

    if (dbError) {
        console.error('Error fetching all affiliates:', dbError)
    } else {
        console.log(`Total Affiliates in DB: ${allAffiliates?.length || 0}`)
        if (allAffiliates?.length > 0) {
            console.log('Sample Affiliate:', allAffiliates[0])
        }
    }

    // 2. Check Admin Role for 'harsh.tank@systrocode.tech'
    console.log('\n--- Checking Admin Role ---')
    const { data: users, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
        console.error('Error fetching users:', userError);
    } else {
        const superAdmin = users.users.find(u => u.email === 'harsh.tank@systrocode.tech');
        if (superAdmin) {
            console.log(`Super Admin User ID: ${superAdmin.id}`);

            const { data: roles, error: roleError } = await supabase
                .from('user_roles')
                .select('*')
                .eq('user_id', superAdmin.id);

            if (roleError) {
                console.error('Error fetching roles:', roleError);
            } else {
                console.log('Super Admin Roles:', roles);
            }
        } else {
            console.error('Super Admin user NOT FOUND in Auth users');
        }
    }

    // 3. Test RPC function (Note: Validation logic in RPC depends on auth.uid(), which we can't easily simulate with service role client as 'auth.uid()' will be empty or service role. access might be bypassed or fail safely. 
    // Ideally we should try to invoke it. Service role bypasses RLS, but the function has explicit checks.)

    console.log('\n--- Testing connection ---')
    // We can't really test the RPC "as a user" easily without a user session, but we verified the data existence above.
}

debugAffiliates().catch(console.error)
