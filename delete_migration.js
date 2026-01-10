const fs = require('fs');
const path = require('path');

const fileToDelete = path.join(__dirname, 'supabase', 'migrations', '20260109000000_create_invoices_table.sql');

if (fs.existsSync(fileToDelete)) {
    try {
        fs.unlinkSync(fileToDelete);
        console.log(`Successfully deleted ${fileToDelete}`);
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
} else {
    console.log(`File ${fileToDelete} does not exist.`);
}
