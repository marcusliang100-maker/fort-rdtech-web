const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.scryptSync(process.env.SECRET_KEY || 'fort-default-secret-key-123456789', 'salt', 32);
const iv = crypto.scryptSync(process.env.SECRET_KEY || 'fort-default-secret-key-123456789', 'salt', 16);

function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code, token } = req.body;
    
    if (!email || !code || !token) {
      return res.status(400).json({ error: 'Email, code, and token are required' });
    }

    let decryptedText;
    try {
      decryptedText = decrypt(token);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid token verification' });
    }

    const [tokenEmail, tokenCode, tokenExpiry] = decryptedText.split('|');

    // 1. Check if email matches
    if (tokenEmail.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({ error: 'Email address mismatch' });
    }

    // 2. Check if code matches
    if (tokenCode !== code) {
      return res.status(400).json({ error: 'Incorrect verification code' });
    }

    // 3. Check if expired
    if (Date.now() > parseInt(tokenExpiry)) {
      return res.status(400).json({ error: 'Verification code has expired (5-minute limit)' });
    }

    // Success
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Verify error:', error);
    return res.status(500).json({ error: 'Internal server error during verification' });
  }
};
