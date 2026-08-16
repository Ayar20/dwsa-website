const { Pool } = require('pg');

const DEFAULT_ADVERT = {
  id: 'ai-coding-academy',
  title: 'AI CODING ACADEMY',
  sub_badge: 'FROM ZERO TO FULL-STACK IN 8 WEEKS',
  tagline: 'AI-POWERED TECH BOOTCAMP',
  description: 'Master modern software engineering by leveraging cutting-edge Artificial Intelligence.',
  feature_1_title: 'BUILD REAL APPS',
  feature_1_sub: 'WITH AI INTEGRATION',
  feature_2_title: 'NO CODING',
  feature_2_sub: 'EXPERIENCE NEEDED',
  walkaway_points: [
    'Live personal portfolio website',
    'Full-stack app (deployed to production)',
    'Clean GitHub profile with real projects',
    'Ability to build any app using AI tools',
    'Official Certificate of Completion'
  ],
  early_bird_price: '₦45,000',
  early_bird_sub: 'Save ₦10,000 when you register early (First 8 Students)',
  standard_price: '₦55,000',
  split_pay_price: '₦30k + ₦25k',
  duration: '8 WEEKS TO TRANSFORM YOUR FUTURE',
  whatsapp_number: '0708 213 5071',
  whatsapp_link: 'https://wa.me/2347082135071',
  bank_account_name: 'Ayar Japheth Idyege',
  bank_moniepoint: '7033337569',
  bank_gtb: '0432342339',
  is_active: true
};

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;

  if (!dbUrl) {
    return res.status(200).json({ success: true, data: DEFAULT_ADVERT });
  }

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

    const result = await pool.query("SELECT data FROM adverts WHERE id = 'active_advert' LIMIT 1");

    if (result.rows.length > 0 && result.rows[0].data) {
      return res.status(200).json({ success: true, data: result.rows[0].data });
    }

    return res.status(200).json({ success: true, data: DEFAULT_ADVERT });
  } catch (error) {
    console.error('Error fetching advert from DB:', error);
    return res.status(200).json({ success: true, data: DEFAULT_ADVERT });
  } finally {
    await pool.end();
  }
};
