const { Pool } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const expectedToken = `Bearer ${Buffer.from(adminPassword).toString('base64')}`;

  if (authHeader !== expectedToken) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const advertData = req.body;
  if (!advertData || !advertData.title) {
    return res.status(400).json({ message: 'Invalid advert payload' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS adverts (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      INSERT INTO adverts (id, data, updated_at)
      VALUES ('active_advert', $1, NOW())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `, [JSON.stringify(advertData)]);

    res.status(200).json({ success: true, message: 'Advert updated successfully', data: advertData });
  } catch (error) {
    console.error('Error saving advert to DB:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await pool.end();
  }
}
