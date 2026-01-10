import { loadEnv } from 'vite';

const mode = 'production';
const env = loadEnv(mode, process.cwd(), '');

console.log('--- Vite Environment Loading Debug ---');
console.log(`Loading env for mode: ${mode}`);
console.log('VITE_SUPABASE_URL:', env.VITE_SUPABASE_URL ? 'Defined (Length: ' + env.VITE_SUPABASE_URL.length + ')' : 'UNDEFINED');
console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'Defined (Length: ' + env.VITE_SUPABASE_PUBLISHABLE_KEY.length + ')' : 'UNDEFINED');

if (!env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    console.log('\n!!! ERROR: VITE_SUPABASE_PUBLISHABLE_KEY is missing from the environment that Vite sees.');
    console.log('Ensure it is in .env and not commented out.');
} else {
    console.log('\nSUCCESS: Vite sees the key. The build should work.');
}
