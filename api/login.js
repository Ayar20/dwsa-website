const { verifyPassword, generateToken } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password } = req.body || {};

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  if (verifyPassword(password)) {
    const token = generateToken();
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
};

