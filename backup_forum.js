const fs = require('fs');
const http = require('https');

const JSONBIN_API_KEY = '$2a$10$dyD3z1qqfjVPAbACVskqTu2cQm1w1GoeutVQgtN11nP8ojJGk8gjO';
const JSONBIN_BIN_ID = '6a4b5b0af5f4af5e29654352';

if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
  console.error('Error: JSONBin API Key or Bin ID is missing in main.js configuration!');
  process.exit(1);
}

const options = {
  hostname: 'api.jsonbin.io',
  path: `/v3/b/${JSONBIN_BIN_ID}/latest`,
  method: 'GET',
  headers: {
    'X-Master-Key': JSONBIN_API_KEY
  }
};

console.log('Connecting to JSONBin.io to retrieve live forum posts...');
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Backup failed: Server returned HTTP ${res.statusCode}`);
      console.error(body);
      process.exit(1);
    }
    
    try {
      const data = JSON.parse(body);
      const posts = data.record;
      const backupPath = './backup_posts.json';
      
      fs.writeFileSync(backupPath, JSON.stringify(posts, null, 2), 'utf8');
      console.log(`\n🎉 SUCCESS! Live forum posts backed up locally!`);
      console.log(`Saved ${posts.length} posts to: ${backupPath}`);
    } catch (e) {
      console.error('Failed to parse response data:', e);
    }
  });
});

req.on('error', (e) => {
  console.error('HTTP Request Error:', e);
});
req.end();
