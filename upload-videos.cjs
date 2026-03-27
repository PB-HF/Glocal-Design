/**
 * Upload hero.mp4 and hero-mobile.mp4 to ImageKit
 * Run: node upload-videos.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

const PRIVATE_KEY = 'private_38qE5bXDraDljjmOelXr3bj1nzg=';
const URL_ENDPOINT = 'https://ik.imagekit.io/n1mgndrpr';

function uploadFile(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const fileSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
    console.log(`\n📤 Uploading ${fileName} (${fileSize} MB)...`);

    const form = new FormData();
    form.append('file', fileStream, { filename: fileName });
    form.append('fileName', fileName);
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          const result = JSON.parse(data);
          console.log(`✅ ${fileName} uploaded!`);
          console.log(`   URL: ${result.url}`);
          resolve(result);
        } else {
          console.error(`❌ Failed: HTTP ${res.statusCode}`);
          console.error(data.slice(0, 200));
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    // Show upload progress
    let uploaded = 0;
    const total = fs.statSync(filePath).size;
    fileStream.on('data', chunk => {
      uploaded += chunk.length;
      const pct = Math.round((uploaded / total) * 100);
      process.stdout.write(`\r   Progress: ${pct}%   `);
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

async function main() {
  console.log('🚀 Uploading videos to ImageKit...');

  const videos = [
    { file: path.join(__dirname, 'public', 'hero.mp4'), name: 'hero.mp4' },
    { file: path.join(__dirname, 'public', 'hero-mobile.mp4'), name: 'hero-mobile.mp4' },
  ];

  for (const v of videos) {
    if (!fs.existsSync(v.file)) {
      console.error(`❌ File not found: ${v.file}`);
      continue;
    }
    await uploadFile(v.file, v.name);
  }

  console.log('\n\n✅ All videos uploaded!');
  console.log(`\n📋 Your video URLs:`);
  console.log(`   Desktop: ${URL_ENDPOINT}/hero.mp4`);
  console.log(`   Mobile:  ${URL_ENDPOINT}/hero-mobile.mp4`);
  console.log(`\n   .env already has: VITE_IMAGEKIT_URL=${URL_ENDPOINT}`);
  console.log('   ✅ Code will auto-use CDN URLs — no more changes needed!');
}

main().catch(console.error);
