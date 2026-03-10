import sharp from 'sharp';

async function processLogo() {
    await sharp('public/logos/avelo-logo.png')
        .trim()
        .toFile('public/logos/avelo-logo-trimmed.png');

    console.log("Success: avelo-logo-trimmed.png created.");
}

processLogo().catch(console.error);
