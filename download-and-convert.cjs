/**
 * Download frames from ImageKit + Convert to MP4
 * Fixed: Uses PNG intermediate format for wider ffmpeg compatibility
 * Run: node download-and-convert.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const IMAGEKIT_URL = 'https://ik.imagekit.io/n1mgndrpr';
const TOTAL_FRAMES = 377;
const FRAMES_DIR = path.join(__dirname, 'public', 'frames_temp');
const OUTPUT_VIDEO = path.join(__dirname, 'public', 'hero.mp4');
const CONCURRENCY = 8;

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = (reqUrl) => {
      https.get(reqUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          file.close();
          return request(response.headers.location);
        }
        if (response.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(dest); } catch(e){}
          return reject(new Error(`HTTP ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }).on('error', (err) => {
        try { fs.unlinkSync(dest); } catch(e){}
        reject(err);
      });
    };
    request(url);
  });
}

function padNum(n) { return String(n).padStart(5, '0'); }

async function downloadFrames() {
  if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
  
  // Check already downloaded
  const existing = fs.readdirSync(FRAMES_DIR).length;
  if (existing >= TOTAL_FRAMES) {
    console.log(`✅ All ${TOTAL_FRAMES} frames already downloaded`);
    return;
  }

  console.log(`📥 Downloading ${TOTAL_FRAMES} frames from ImageKit...`);
  let done = existing, failed = 0;

  for (let i = 0; i < TOTAL_FRAMES; i += CONCURRENCY) {
    const batch = [];
    for (let j = i; j < Math.min(i + CONCURRENCY, TOTAL_FRAMES); j++) {
      const fileName = `Gd_${padNum(j)}.webp`;
      const dest = path.join(FRAMES_DIR, fileName);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { done++; continue; }
      // Use ?tr=f-png to get PNG from ImageKit for better ffmpeg compatibility
      const url = `${IMAGEKIT_URL}/frames/${fileName}?tr=f-png`;
      const pngDest = dest.replace('.webp', '.png');
      batch.push(
        downloadFile(url, pngDest)
          .then(() => done++)
          .catch(() => { failed++; })
      );
    }
    await Promise.allSettled(batch);
    process.stdout.write(`\r  Downloaded: ${done}/${TOTAL_FRAMES} | Failed: ${failed}   `);
  }
  console.log(`\n✅ Downloads done: ${done} success, ${failed} failed`);
}

function convertToVideo() {
  console.log('\n🎬 Converting frames to MP4 with ffmpeg...');
  
  // Use PNG files (more compatible)
  const inputPattern = path.join(FRAMES_DIR, 'Gd_%05d.png');
  
  const args = [
    '-y',
    '-framerate', '30',
    '-i', inputPattern,
    '-c:v', 'libx264',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-preset', 'fast',
    OUTPUT_VIDEO
  ];

  console.log('  Running: ffmpeg ' + args.join(' '));
  const result = spawnSync('ffmpeg', args, { stdio: 'inherit', shell: true });
  
  if (result.status === 0 && fs.existsSync(OUTPUT_VIDEO)) {
    const size = (fs.statSync(OUTPUT_VIDEO).size / 1024 / 1024).toFixed(1);
    console.log(`\n✅ Video created! hero.mp4 = ${size} MB (was ~100MB of images)`);
  } else {
    console.error('\n❌ ffmpeg conversion failed. Status:', result.status);
    if (result.error) console.error(result.error.message);
  }
}

function cleanup() {
  console.log('\n🧹 Cleaning up temp frames...');
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log('✅ Done');
}

async function main() {
  await downloadFrames();
  convertToVideo();
  cleanup();

  if (fs.existsSync(OUTPUT_VIDEO)) {
    const size = (fs.statSync(OUTPUT_VIDEO).size / 1024 / 1024).toFixed(1);
    console.log(`\n🎉 hero.mp4 ready! (${size} MB)`);
    console.log('   Next: Upload to ImageKit, then code will use video instead of images');
  }
}

main().catch(console.error);
