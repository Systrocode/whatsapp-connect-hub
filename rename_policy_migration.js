const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, 'supabase', 'migrations');
const oldFile = path.join(migrationsDir, '20260109000001_admin_invoice_policy.sql');
const newFile = path.join(migrationsDir, '20260109000006_admin_invoice_policy.sql');

if (fs.existsSync(oldFile)) {
    try {
        fs.renameSync(oldFile, newFile);
        console.log(`Successfully renamed ${oldFile} to ${newFile}`);
    } catch (err) {
        console.error(`Error renaming file: ${err.message}`);
    }
} else {
    console.log(`File ${oldFile} does not exist.`);
}
