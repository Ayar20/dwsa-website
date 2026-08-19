const { Pool } = require('pg');

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function sanitizeInput(str, maxLength = 255) {
  if (typeof str !== 'string') return '';
  // Remove control characters / null bytes and trim
  return str.replace(/[\x00-\x1F\x7F]/g, '').trim().substring(0, maxLength);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, program, payment_option, learning_mode } = req.body || {};

  const cleanName = sanitizeInput(name, 100);
  const cleanEmail = sanitizeInput(email, 120).toLowerCase();
  const cleanPhone = sanitizeInput(phone, 30);
  const cleanProgram = sanitizeInput(program, 100) || 'AI Coding Academy';
  const cleanPayment = sanitizeInput(payment_option, 100) || 'Early Bird (₦45,000)';
  const cleanMode = sanitizeInput(learning_mode, 100) || 'Physical (Makurdi)';

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ message: 'A valid Full Name (at least 2 characters) is required.' });
  }

  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ message: 'A valid Email address is required.' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(
      `INSERT INTO registrations (name, email, phone, program, payment_option, learning_mode) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, program, created_at`,
      [cleanName, cleanEmail, cleanPhone, cleanProgram, cleanPayment, cleanMode]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Database Registration Error:', error);
    res.status(500).json({ success: false, message: 'Database error. Please try again.' });
  } finally {
    await pool.end();
  }
};

