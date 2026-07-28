const { Pool } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, program, payment_option, learning_mode } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Ensure registrations table exists with all modern columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        program VARCHAR(255) DEFAULT 'AI Coding Academy',
        payment_option VARCHAR(100),
        learning_mode VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure missing columns exist if table was previously created with fewer columns
    await pool.query(`
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS payment_option VARCHAR(100),
      ADD COLUMN IF NOT EXISTS learning_mode VARCHAR(100);
    `);

    const result = await pool.query(
      `INSERT INTO registrations (name, email, phone, program, payment_option, learning_mode) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        name,
        email,
        phone || '',
        program || 'AI Coding Academy',
        payment_option || 'Early Bird (₦45,000)',
        learning_mode || 'Physical (Makurdi)'
      ]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Database Registration Error:', error);
    res.status(500).json({ success: false, message: 'Database error. Please try again.' });
  } finally {
    await pool.end();
  }
}
