/**
 * Frame Preloader Utility
 * Efficiently loads image frames from /frames/
 * Caches loaded images in memory for smooth playback
 */

class FramePreloader {
  constructor(totalFrames = 120) {
    this.totalFrames = totalFrames;
    this.frames = [];
    this.loadedCount = 0;
    this.isLoading = false;
    this.padding = String(totalFrames).length; // For frame numbering (e.g., 4 digits)
  }

  /**
   * Get the padded frame number (e.g., 00000, 00001)
   */
  getFrameNumber(index) {
    return String(index).padStart(5, '0');
  }

  /**
   * Preload all frames
   */
  async preloadFrames() {
    if (this.isLoading) {
      console.log('⚠️ Already loading frames...');
      return;
    }
    this.isLoading = true;

    console.log(`🚀 Starting to load ${this.totalFrames} frames...`);

    const promises = [];

    for (let i = 0; i < this.totalFrames; i++) {
      promises.push(this.loadFrame(i));
    }

    // Use allSettled instead of all - doesn't stop on first failure
    const results = await Promise.allSettled(promises);

    // Count successful loads
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const failCount = results.filter(r => r.status === 'rejected').length;

    console.log(`✅ Completed: ${successCount}/${this.totalFrames} frames loaded`);
    
    if (failCount > 0) {
      console.error(`❌ Failed: ${failCount} frames could not load`);
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`  Frame ${i}: ${r.reason}`);
        }
      });
    }

    this.isLoading = false;
    return { successCount, failCount };
  }

  /**
   * Load a single frame
   */
  loadFrame(index) {
    return new Promise((resolve, reject) => {
      const frameNum = this.getFrameNumber(index);
      const imgPath = `/frames/Gd_${frameNum}.webp`;

      const img = new Image();
      img.onload = () => {
        this.frames[index] = img;
        this.loadedCount++;
        if (index < 3 || index % 100 === 0) {
          console.log(`  ✓ Frame ${index}: ${imgPath}`);
        }
        resolve(img);
      };
      img.onerror = (err) => {
        console.error(`  ✗ Frame ${index}: ${imgPath} - Error: ${err}`);
        this.loadedCount++; // Still count it to track progress
        reject(new Error(`Failed: ${imgPath}`));
      };
      img.src = imgPath;
    });
  }

  /**
   * Get frame by index
   */
  getFrame(index) {
    const clampedIndex = Math.max(0, Math.min(index, this.totalFrames - 1));
    return this.frames[clampedIndex];
  }

  /**
   * Get loading progress (0-100)
   */
  getProgress() {
    return (this.loadedCount / this.totalFrames) * 100;
  }

  /**
   * Check if all frames are loaded
   */
  isReady() {
    return this.loadedCount === this.totalFrames;
  }
}

export default FramePreloader;
