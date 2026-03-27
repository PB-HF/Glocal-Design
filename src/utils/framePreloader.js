/**
 * Frame Preloader Utility — OPTIMIZED
 * 
 * Strategy:
 * 1. PRIORITY LOAD: First 40 frames immediately (covers first scroll interaction)
 * 2. FORWARD LOAD: Next frames in order (what user will scroll to)
 * 3. BACKGROUND: Rest of frames quietly in background
 * 
 * ImageKit Optimization:
 * - Adds ?tr=q-65,f-webp to reduce file size ~40% with barely visible quality loss
 */

const IS_IMAGEKIT = (path) => path.includes('ik.imagekit.io');

function buildUrl(framePath, fileName) {
  if (IS_IMAGEKIT(framePath)) {
    // ImageKit transformations: quality 65, format webp, progressive
    return `${framePath}/${fileName}?tr=q-65,f-webp,pr-true`;
  }
  return `${framePath}/${fileName}`;
}

class FramePreloader {
  constructor(totalFrames = 120, framePath = '/frames') {
    this.totalFrames = totalFrames;
    this.framePath = framePath;
    this.frames = [];
    this.loadedCount = 0;
    this.isLoading = false;
    this.progressCallbacks = [];
    this.readyCallbacks = [];
  }

  onProgress(callback) {
    this.progressCallbacks.push(callback);
  }

  onReady(callback) {
    this.readyCallbacks.push(callback);
  }

  emitProgress(loaded, total) {
    const progress = (loaded / total) * 100;
    this.progressCallbacks.forEach(cb => cb(progress));
  }

  getFrameNumber(index) {
    return String(index).padStart(5, '0');
  }

  loadFrame(index) {
    // Skip if already loaded
    if (this.frames[index] && this.frames[index].complete) {
      return Promise.resolve(this.frames[index]);
    }

    return new Promise((resolve, reject) => {
      const frameNum = this.getFrameNumber(index);
      const fileName = `Gd_${frameNum}.webp`;
      const imgPath = buildUrl(this.framePath, fileName);

      const img = new Image();
      img.onload = () => {
        this.frames[index] = img;
        this.loadedCount++;
        this.emitProgress(this.loadedCount, this.totalFrames);
        resolve(img);
      };
      img.onerror = () => {
        this.loadedCount++;
        this.emitProgress(this.loadedCount, this.totalFrames);
        reject(new Error(`Failed: ${imgPath}`));
      };
      img.src = imgPath;
    });
  }

  /**
   * Smart preload strategy:
   * Phase 1 — First 40 frames RIGHT NOW (covers first user scroll)
   * Phase 2 — Next 80 frames (mid scroll)
   * Phase 3 — Rest of frames quietly
   */
  async preloadFrames() {
    if (this.isLoading) return;
    this.isLoading = true;

    const PRIORITY_COUNT = 40;   // instant — user sees this first
    const PHASE2_COUNT = 80;     // loads while user starts scrolling
    const BATCH_SIZE = 12;       // concurrent requests per batch

    console.log(`🚀 Loading ${this.totalFrames} frames (3-phase strategy)...`);

    // ─── PHASE 1: First 40 frames — load immediately ───────────────────
    const phase1 = [];
    for (let i = 0; i < Math.min(PRIORITY_COUNT, this.totalFrames); i++) {
      phase1.push(this.loadFrame(i));
    }
    await Promise.allSettled(phase1);
    console.log(`✅ Phase 1 done (${PRIORITY_COUNT} priority frames ready)`);
    this.readyCallbacks.forEach(cb => cb()); // notify: ready to animate

    // ─── PHASE 2: Next ~80 frames in batches ───────────────────────────
    for (let i = PRIORITY_COUNT; i < Math.min(PRIORITY_COUNT + PHASE2_COUNT, this.totalFrames); i += BATCH_SIZE) {
      const batch = [];
      for (let j = i; j < Math.min(i + BATCH_SIZE, PRIORITY_COUNT + PHASE2_COUNT, this.totalFrames); j++) {
        batch.push(this.loadFrame(j));
      }
      await Promise.allSettled(batch);
    }
    console.log(`✅ Phase 2 done (${PRIORITY_COUNT + PHASE2_COUNT} frames ready)`);

    // ─── PHASE 3: Rest of frames quietly in background ─────────────────
    for (let i = PRIORITY_COUNT + PHASE2_COUNT; i < this.totalFrames; i += BATCH_SIZE) {
      const batch = [];
      for (let j = i; j < Math.min(i + BATCH_SIZE, this.totalFrames); j++) {
        batch.push(this.loadFrame(j));
      }
      await Promise.allSettled(batch);
    }

    this.isLoading = false;
    console.log(`✅ All ${this.totalFrames} frames loaded`);
  }

  getFrame(index) {
    const clampedIndex = Math.max(0, Math.min(index, this.totalFrames - 1));
    return this.frames[clampedIndex];
  }

  getProgress() {
    return (this.loadedCount / this.totalFrames) * 100;
  }

  isReady() {
    return this.frames[0] && this.frames[0].complete;
  }
}

export default FramePreloader;
