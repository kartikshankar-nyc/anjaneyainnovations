// Script to generate favicon PNG files from SVG
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Main function to generate favicons
async function generateFavicons() {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
        console.error('Error: favicon.svg not found in public directory');
        process.exit(1);
    }

    console.log('Generating favicon files...');

    try {
        // Create 16x16 PNG
        await sharp(svgPath)
            .resize(16, 16)
            .png()
            .toFile(path.join(publicDir, 'favicon-16x16.png'));
        console.log('✓ Generated favicon-16x16.png');

        // Create 32x32 PNG
        await sharp(svgPath)
            .resize(32, 32)
            .png()
            .toFile(path.join(publicDir, 'favicon-32x32.png'));
        console.log('✓ Generated favicon-32x32.png');

        // Create 180x180 PNG (for Apple Touch Icon)
        await sharp(svgPath)
            .resize(180, 180)
            .png()
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
        console.log('✓ Generated apple-touch-icon.png');

        // Also create a 192x192 PNG (for Android)
        await sharp(svgPath)
            .resize(192, 192)
            .png()
            .toFile(path.join(publicDir, 'icon-192x192.png'));
        console.log('✓ Generated icon-192x192.png');

        console.log('All favicon files generated successfully!');
    } catch (err) {
        console.error('Error generating favicons:', err);
        process.exit(1);
    }
}

// Run the function
generateFavicons(); 