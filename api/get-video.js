const { Pool } = require('pg');

const DEFAULT_VIDEO = {
  title: 'Welcome to DWSA',
  subtitle: 'Watch our introductory video to learn more about our vision.',
  video_url: 'intro-video.mp4',
  poster_url: 'video-thumbnail.png',
  is_active: true
};

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;

  if (!dbUrl) {
    return res.status(200).json({ success: true, data: DEFAULT_VIDEO });
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query("SELECT data FROM videos WHERE id = 'active_video' LIMIT 1");

    if (result.rows.length > 0 && result.rows[0].data) {
      return res.status(200).json({ success: true, data: result.rows[0].data });
    }

    return res.status(200).json({ success: true, data: DEFAULT_VIDEO });
  } catch (error) {
    console.error('Error fetching video from DB:', error);
    return res.status(200).json({ success: true, data: DEFAULT_VIDEO });
  } finally {
    await pool.end();
  }
};
