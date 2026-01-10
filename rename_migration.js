const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, 'supabase', 'migrations');
const oldFile = path.join(migrationsDir, '20260109000000_create_invoices_table.sql');
const newFile = path.join(migrationsDir, '20260109000005_create_invoices_table.sql');

if (fs.existsSync(oldFile)) {
    fs.renameSync(oldFile, newFile);
    console.log(`Renamed ${oldFile} to ${newFile}`);
} else {
    console.log(`File ${oldFile} not found.`);
}
