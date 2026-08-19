const { Pool } = require('pg');
const { verifyToken } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!verifyToken(authHeader)) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, program, payment_option, learning_mode, to_char(created_at, 'MM/DD/YYYY') as date FROM registrations ORDER BY created_at DESC"
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await pool.end();
  }
};
