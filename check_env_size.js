import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

try {
    if (fs.existsSync(envPath)) {
        const stats = fs.statSync(envPath);
        console.log(`File size: ${stats.size} bytes`);

        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            const parts = line.split('=');
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim();

            if (key.includes('KEY')) {
                console.log(`Line ${idx + 1}: Key=${key}, ValueLength=${val.length}`);
                if (val.length < 20) {
                    console.log("WARNING: Key seems too short! Is it a placeholder?");
                }
            }
        });
    } else {
        console.log("File .env not found");
    }
} catch (e) {
    console.error("Error", e);
}
