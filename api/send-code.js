const nodemailer = require('nodemailer');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.scryptSync(process.env.SECRET_KEY || 'fort-default-secret-key-123456789', 'salt', 32);
const iv = crypto.scryptSync(process.env.SECRET_KEY || 'fort-default-secret-key-123456789', 'salt', 16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
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
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Create encrypted token containing email, code, and expiry
    const tokenData = `${email}|${code}|${expires}`;
    const token = encrypt(tokenData);

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = process.env.SMTP_PORT || 465;

    // Check if real SMTP config is present
    if (!smtpHost || !smtpUser || !smtpPass) {
      // Fallback/Simulated mode if SMTP credentials are not yet set on Vercel
      console.log(`[Simulated Mail] Code ${code} generated for ${email}`);
      return res.status(200).json({
        success: true,
        simulated: true,
        code: '8888', // Return 8888 for easy simulated testing
        token: encrypt(`${email}|8888|${expires}`),
        message: 'SMTP credentials not configured. Running in simulation mode.'
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true for 465, false for 587/25
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Email content
    const mailOptions = {
      from: `"丰泰技研 Fort RDTech" <${smtpUser}>`,
      to: email,
      subject: '丰泰技研 - 下載驗證碼 / Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
            <h2 style="color: #0ea5e9; margin: 0; font-size: 24px;">丰泰技研 Fort RDTech</h2>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0;">科技賦能農業，創新驅動未來</p>
          </div>
          
          <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">您好 / Hello,</h3>
          <p style="color: #334155; font-size: 15px; line-height: 1.6;">
            感謝您對丰泰技研文獻資料的關注。請在網頁下載驗證欄位中輸入以下 6 位數驗證碼：
          </p>
          
          <div style="background-color: #f0f9ff; border: 1px dashed #0ea5e9; border-radius: 8px; padding: 15px 20px; text-align: center; margin: 24px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #0369a1; font-family: monospace;">${code}</span>
          </div>
          
          <p style="color: #ef4444; font-size: 13px; font-weight: 500;">
            ⚠️ 請注意：此驗證碼將於 5 分鐘後失效。請勿將驗證碼洩漏給他人。<br>
            Please note: This verification code will expire in 5 minutes.
          </p>
          
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 30px 0;">
          
          <div style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
            此信件為系統自動發送，請勿直接回覆。<br>
            This email is sent automatically. Please do not reply.
            <br><br>
            丰泰技研股份有限公司 Fort RDTech Co., Ltd. All rights reserved.
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, simulated: false, token });

  } catch (error) {
    console.error('SMTP sending error:', error);
    return res.status(500).json({ error: 'Failed to send verification code email', details: error.message });
  }
};
