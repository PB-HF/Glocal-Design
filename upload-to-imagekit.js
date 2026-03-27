/**
 * ImageKit Bulk Upload Script
 * Uploads /frames and /frames2 folders to ImageKit CDN
 * 
 * SETUP:
 * 1. npm install imagekit
 * 2. Fill in your ImageKit credentials below
 * 3. node upload-to-imagekit.js
 */

const ImageKit = require('@imagekit/nodejs');
const fs = require('fs');
const path = require('path');

// ============================================
// 👇 FILL THESE FROM YOUR IMAGEKIT DASHBOARD
// Dashboard → Settings → API Keys
// ============================================
const PUBLIC_KEY = 'public_6hHPePvFzAnAyRfqSueH9NULvmk=';
const PRIVATE_KEY = 'private_38qE5bXDraDljjmOelXr3bj1nzg=';
const URL_ENDPOINT = 'https://ik.imagekit.io/n1mgndrpr'; // e.g. https://ik.imagekit.io/abc123
// ============================================

const imagekit = new ImageKit({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
  urlEndpoint: URL_ENDPOINT,
});

// Folders to upload: [localPath, imagekitFolder]
const UPLOAD_JOBS = [
  {
    localDir: path.join(__dirname, 'public', 'frames'),
    ikFolder: '/frames',
    label: 'Desktop frames (377 files)'
  },
  {
    localDir: path.join(__dirname, 'public', 'frames2'),
    ikFolder: '/frames2',
    label: 'Mobile frames2 (224 files)'
  }
];

// Upload a single file
async function uploadFile(filePath, fileName, folder) {
  const fileBuffer = fs.readFileSync(filePath);
  return imagekit.upload({
    file: fileBuffer,
    fileName: fileName,
    folder: folder,
    useUniqueFileName: false, // Keep original names like Gd_00001.webp
  });
}

// Upload all files in a folder with concurrency control
async function uploadFolder(localDir, ikFolder, label, concurrency = 5) {
  const files = fs.readdirSync(localDir).filter(f => f.endsWith('.webp'));
  const total = files.length;
  let done = 0;
  let failed = 0;

  console.log(`\n📂 Starting: ${label}`);
  console.log(`   ${total} files → ImageKit${ikFolder}`);
  console.log('─'.repeat(50));

  // Process in batches
  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(fileName =>
        uploadFile(path.join(localDir, fileName), fileName, ikFolder)
      )
    );

    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        done++;
      } else {
        failed++;
        console.error(`  ❌ ${batch[idx]}: ${result.reason?.message}`);
      }
    });

    // Progress bar
    const pct = Math.round((done / total) * 100);
    process.stdout.write(`\r  ✅ Progress: ${done}/${total} (${pct}%) | ❌ Failed: ${failed}`);
  }

  console.log(`\n  🏁 Done: ${done} uploaded, ${failed} failed\n`);
}

async function main() {
  console.log('🚀 ImageKit Bulk Upload Starting...');
  console.log(`   Endpoint: ${URL_ENDPOINT}`);
  
  if (PUBLIC_KEY === 'your_public_key_here') {
    console.error('\n❌ ERROR: Please fill in your ImageKit credentials at the top of this file!');
    console.error('   Get them from: https://imagekit.io/dashboard/developer/api-keys\n');
    process.exit(1);
  }

  for (const job of UPLOAD_JOBS) {
    await uploadFolder(job.localDir, job.ikFolder, job.label);
  }

  console.log('✅ All uploads complete!');
  console.log(`\n📋 Now update your code with this base URL:`);
  console.log(`   ${URL_ENDPOINT}`);
  console.log('\n   In ScrollAnimationCanvas.jsx:');
  console.log(`   Desktop: ${URL_ENDPOINT}/frames`);
  console.log(`   Mobile:  ${URL_ENDPOINT}/frames2`);
}

main().catch(console.error);
