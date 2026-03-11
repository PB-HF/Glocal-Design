/**
 * Test Frame Generator
 * Creates test frames in the browser for development/testing
 * 
 * Usage: Run this file in browser console or integrate into dev environment
 */

export const generateTestFrames = async (totalFrames = 120) => {
  console.log(`🎬 Generating ${totalFrames} test frames...`);

  // Create frames sequentially to avoid flooding memory/network
  for (let i = 0; i < totalFrames; i++) {
    await new Promise((resolve) => {
      // Create an offscreen canvas to draw test frame
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      // Background gradient (varying per frame)
      const hue = (i / totalFrames) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 30%)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.5)`);
      gradient.addColorStop(1, `hsla(${(hue + 60) % 360}, 100%, 50%, 0.3)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add frame counter
      ctx.fillStyle = 'white';
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `Frame ${String(i + 1).padStart(4, '0')}`,
        canvas.width / 2,
        canvas.height / 2
      );

      // Add progress bar
      const barWidth = 600;
      const barHeight = 30;
      const progress = i / totalFrames;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(
        canvas.width / 2 - barWidth / 2,
        canvas.height - 100,
        barWidth,
        barHeight
      );
      ctx.fillStyle = 'white';
      ctx.fillRect(
        canvas.width / 2 - barWidth / 2,
        canvas.height - 100,
        barWidth * progress,
        barHeight
      );

      // Convert canvas to blob and create frame image
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const frameNum = String(i + 1).padStart(4, '0');
        const filename = `frame_${frameNum}.png`;

        // Log for reference
        if (i % 10 === 0) {
          console.log(`✓ Generated ${filename}`);
        }

        // You can download frames here if needed:
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = filename;
        // a.click();
        // URL.revokeObjectURL(url);

        resolve();
      });
    });
  }

  console.log('✅ All test frames generated!');
};

// Usage in browser console:
// import { generateTestFrames } from './generateTestFrames.js'
// generateTestFrames(120)
