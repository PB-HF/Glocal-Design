/**
 * ImageKit Bulk Upload Script (CommonJS)
 * Run: node upload-to-imagekit.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

// ============================================
const PUBLIC_KEY = 'public_6hHPePvFzAnAyRfqSueH9NULvmk=';
const PRIVATE_KEY = 'private_38qE5bXDraDljjmOelXr3bj1nzg=';
const URL_ENDPOINT = 'https://ik.imagekit.io/n1mgndrpr';
// ============================================

// Upload single file via ImageKit REST API directly
function uploadFile(filePath, fileName, folder) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('file', fileStream, { filename: fileName });
    form.append('fileName', fileName);
    form.append('folder', folder);
    form.append('useUniqueFileName', 'false');

    const auth = Buffer.from(PRIVATE_KEY + ':').toString('base64');

    const options = {
      hostname: 'upload.imagekit.io',
      path: '/api/v1/files/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Authorization': `Basic ${auth}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

// Upload folder with concurrency
async function uploadFolder(localDir, ikFolder, label, concurrency = 6) {
  const files = fs.readdirSync(localDir).filter(f => f.endsWith('.webp'));
  const total = files.length;
  let done = 0;
  let failed = 0;

  console.log(`\n📂 ${label}`);
  console.log(`   ${total} files → ImageKit${ikFolder}`);
  console.log('─'.repeat(50));

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
        const errMsg = result.reason?.message || 'unknown';
        // Only log first 3 errors to avoid flooding console
        if (failed <= 3) console.error(`\n  ❌ ${batch[idx]}: ${errMsg.slice(0, 80)}`);
      }
    });

    const pct = Math.round((done / total) * 100);
    process.stdout.write(`\r  Progress: ${done}/${total} (${pct}%) | Failed: ${failed}   `);
  }

  console.log(`\n  ✅ Done: ${done} uploaded, ${failed} failed`);
}

async function main() {
  // Check form-data is installed
  try { require('form-data'); } catch(e) {
    console.error('❌ Missing package! Run: npm install form-data --save-dev');
    process.exit(1);
  }

  console.log('🚀 ImageKit Upload Starting...');
  console.log(`   Endpoint: ${URL_ENDPOINT}\n`);

  await uploadFolder(
    path.join(__dirname, 'public', 'frames'),
    '/frames',
    'Desktop frames (377 files)'
  );

  await uploadFolder(
    path.join(__dirname, 'public', 'frames2'),
    '/frames2',
    'Mobile frames2 (224 files)'
  );

  console.log('\n✅ All uploads complete!');
  console.log('\n📋 Now update .env file:');
  console.log(`   VITE_IMAGEKIT_URL=${URL_ENDPOINT}`);
  console.log('\n   Then: Ctrl+C and npm run dev');
}

main().catch(console.error);
