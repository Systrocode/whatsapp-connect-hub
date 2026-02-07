const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, 'supabase', 'migrations');
const files = fs.readdirSync(migrationsDir);

// Log all files to see exactly what we have
console.log('Current files:', files);

// Identify conflict
const conflictFile = '20260109000000_create_invoices_table.sql';
const conflictPath = path.join(migrationsDir, conflictFile);

if (fs.existsSync(conflictPath)) {
    console.log(`Found duplicate file: ${conflictFile}`);
    try {
        fs.unlinkSync(conflictPath);
        console.log(`Successfully DELETED ${conflictFile}`);
    } catch (e) {
        console.error(`FAILED to delete: ${e.message}`);
    }
} else {
    console.log(`File ${conflictFile} not found (weird, but good).`);
}
