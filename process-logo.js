import sharp from 'sharp';

async function processLogo() {
    // Read and trim
    const trimmed = await sharp('public/logos/avelo-logo.png').trim().toBuffer();
    const meta = await sharp(trimmed).metadata();

    // Make inverted version (bg=black, logo=white)
    const alphaChannel = await sharp(trimmed)
        .greyscale()
        .negate({ alpha: false })
        .toBuffer();

    // Create pure white base and apply alpha
    await sharp({
        create: {
            width: meta.width,
            height: meta.height,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
    })
        .joinChannel(alphaChannel)
        .toFile('public/logos/avelo-logo-white-trimmed.png');

    console.log("Success: avelo-logo-white-trimmed.png created.");
}

processLogo().catch(console.error);
