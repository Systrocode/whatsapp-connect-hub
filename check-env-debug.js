import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
    console.log("ERROR: .env file not found at " + envPath);
    process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split('\n');

const keys = {};
lines.forEach(line => {
    const parts = line.split('=');
    if (parts.length > 1) {
        const key = parts[0].trim();
        keys[key] = true;
    }
});

console.log("Checking .env keys:");
console.log("VITE_SUPABASE_URL: " + (keys['VITE_SUPABASE_URL'] ? "FOUND" : "MISSING"));
console.log("VITE_SUPABASE_PUBLISHABLE_KEY: " + (keys['VITE_SUPABASE_PUBLISHABLE_KEY'] ? "FOUND" : "MISSING"));

// Check for common misspellings or alternatives
Object.keys(keys).forEach(k => {
    if (k.includes('SUPABASE') && k !== 'VITE_SUPABASE_URL' && k !== 'VITE_SUPABASE_PUBLISHABLE_KEY') {
        console.log(`Found potentially related key: ${k}`);
    }
});
