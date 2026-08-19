const crypto = require('crypto');

const AUTH_SECRET = process.env.ADMIN_PASSWORD || process.env.AUTH_SECRET || 'dwsa_admin_secure_key_2026';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Generates a cryptographically signed auth token.
 * Format: <timestamp>.<hmacSignature>
 */
function generateToken() {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac('sha256', AUTH_SECRET).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
}

/**
 * Validates the Authorization header against the signed HMAC token.
 * Returns true if valid and not expired, false otherwise.
 */
function verifyToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') {
    return false;
  }

  const parts = authHeader.split(' ');
  const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : authHeader;

  // Also support legacy base64 token transition if needed
  if (!token.includes('.')) {
    const legacyExpected = Buffer.from(AUTH_SECRET).toString('base64');
    return token === legacyExpected;
  }

  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) {
    return false;
  }

  const tokenTime = parseInt(timestamp, 10);
  if (isNaN(tokenTime) || Date.now() - tokenTime > TOKEN_MAX_AGE_MS || tokenTime > Date.now() + 60000) {
    return false; // Expired or future timestamp
  }

  const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(timestamp).digest('hex');

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

/**
 * Safely validates user-submitted password with constant-time comparison.
 */
function verifyPassword(inputPassword) {
  if (!inputPassword || typeof inputPassword !== 'string') {
    return false;
  }

  const targetPassword = process.env.ADMIN_PASSWORD || 'dwsa_admin_default_secure_pass_2026';
  const inputBuffer = Buffer.from(inputPassword);
  const targetBuffer = Buffer.from(targetPassword);

  if (inputBuffer.length !== targetBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

module.exports = {
  generateToken,
  verifyToken,
  verifyPassword
};
