import fs from 'fs';
import path from 'path';

try {
    const envPath = path.resolve('.env');
    if (!fs.existsSync(envPath)) {
        console.error("Error: .env file not found!");
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            // user might have '=' in value, join rest
            const value = parts.slice(1).join('=').trim().replace(/^"|"$/g, '');
            envVars[key] = value;
        }
    });

    const TOKEN = envVars.VITE_W_TOKEN;
    const PHONE_ID = envVars.VITE_W_PHONE_ID;

    if (!TOKEN || !PHONE_ID) {
        console.error("Error: VITE_W_TOKEN or VITE_W_PHONE_ID not found in .env");
        console.log("Found vars:", Object.keys(envVars));
        process.exit(1);
    }

    const recipient = process.argv[2];
    if (!recipient) {
        console.error("\n❌ Error: No recipient phone number provided.");
        console.log("Usage: node test-message.js <PHONE_NUMBER_WITH_COUNTRY_CODE>");
        console.log("Example: node test-message.js 15550239202\n");
        process.exit(1);
    }

    console.log(`\n📤 Sending test message...`);
    console.log(`To: ${recipient}`);
    console.log(`From ID: ${PHONE_ID}`);

    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: recipient,
            type: 'text',
            text: { body: "🔔 Hello! This is a test message from your WhatsApp Connect Hub." },
        }),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("\n✅ Message Sent Successfully!");
        console.log("Response:", JSON.stringify(data, null, 2));
    } else {
        console.error("\n❌ Message Failed!");
        console.error("Error:", JSON.stringify(data, null, 2));
    }

} catch (error) {
    console.error("Script Error:", error);
}
