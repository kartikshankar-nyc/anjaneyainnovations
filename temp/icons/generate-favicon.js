// Simple script to create PNG favicon files

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory for the favicon files
const publicDir = path.join(__dirname, '../../public');

// Colors for the favicon
const colors = {
    background: 'transparent',
    accent: '#22D3EE',
    text: '#E5E7EB'
};

// Function to create a favicon of a specific size
function createFavicon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background (transparent)
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, size, size);

    // Draw "AI" text
    ctx.fillStyle = colors.accent;
    ctx.font = `bold ${Math.floor(size * 0.7)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', size / 2, size / 2);

    // Optional: add a simple border
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = size > 20 ? 2 : 1;
    ctx.strokeRect(2, 2, size - 4, size - 4);

    return canvas.toBuffer('image/png');
}

console.log("This script requires the 'canvas' npm package to run.");
console.log("Please install it first with: npm install canvas");
console.log("Then run this script again.");

/*
// Create the PNG files (uncomment after installing canvas)
try {
  // Generate 16x16 favicon
  const favicon16 = createFavicon(16);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), favicon16);
  console.log('Created favicon-16x16.png');
  
  // Generate 32x32 favicon
  const favicon32 = createFavicon(32);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), favicon32);
  console.log('Created favicon-32x32.png');
  
  console.log('Favicon files created successfully!');
} catch (error) {
  console.error('Error creating favicon files:', error);
}
*/ 