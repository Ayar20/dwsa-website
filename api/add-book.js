const { Pool } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Validate admin token
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const expectedToken = `Bearer ${Buffer.from(adminPassword).toString('base64')}`;

  if (authHeader !== expectedToken) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const { title, price, cover_image_url, download_url, description } = req.body;

  if (!title || !cover_image_url || !download_url) {
    return res.status(400).json({ message: 'Missing required fields: title, cover_image_url, download_url' });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Auto-create the books table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price VARCHAR(50) DEFAULT 'Free',
        cover_image_url TEXT NOT NULL,
        download_url TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query(
      'INSERT INTO books (title, price, cover_image_url, download_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, price || 'Free', cover_image_url, download_url, description || '']
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await pool.end();
  }
}
