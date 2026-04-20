const { Pool } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(
      "SELECT id, name, email, program, to_char(created_at, 'MM/DD/YYYY') as date FROM registrations ORDER BY created_at DESC"
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await pool.end();
  }
}
