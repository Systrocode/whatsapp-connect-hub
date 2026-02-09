import fs from 'fs';
import path from 'path';

try {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log('Reading .env from:', envPath);

    if (!fs.existsSync(envPath)) {
        console.log('ERROR: .env file does not exist!');
    } else {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');

        let urlFound = false;
        let keyFound = false;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
                const val = trimmed.split('=')[1].trim();
                console.log(`VITE_SUPABASE_URL: Found (Length: ${val.length})`);
                urlFound = true;
            }
            if (trimmed.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) {
                const val = trimmed.split('=')[1].trim();
                console.log(`VITE_SUPABASE_PUBLISHABLE_KEY: Found (Length: ${val.length})`);
                keyFound = true;
            }
        });

        if (!urlFound) console.log('VITE_SUPABASE_URL: NOT FOUND in file');
        if (!keyFound) console.log('VITE_SUPABASE_PUBLISHABLE_KEY: NOT FOUND in file');
    }
} catch (error) {
    console.error('Error reading .env:', error);
}
