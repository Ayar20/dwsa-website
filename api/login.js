module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password } = req.body;

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    const token = Buffer.from(adminPassword).toString('base64');
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
};
