const { Pool } = require('pg');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, program } = req.body;

  // Validate input
  if (!name || !email || !program) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Connect to Neon Database using the environment variable Vercel holds
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Insert into the database we just created
    const result = await pool.query(
      'INSERT INTO registrations (name, email, program) VALUES ($1, $2, $3) RETURNING *',
      [name, email, program]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    // Clean up connection
    await pool.end();
  }
}
