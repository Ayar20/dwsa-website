const https = require('https');
const urlModule = require('url');

const ALLOWED_HOSTS = [
  'drive.google.com',
  'docs.google.com',
  'drive.usercontent.google.com',
  'dropbox.com',
  'dl.dropboxusercontent.com',
  'res.cloudinary.com',
  'cloudinary.com'
];

function isAllowedHost(hostname) {
  if (!hostname || typeof hostname !== 'string') return false;
  const lowerHost = hostname.toLowerCase();

  // Prevent local/internal IP addressing
  if (
    lowerHost === 'localhost' ||
    lowerHost === '127.0.0.1' ||
    lowerHost === '::1' ||
    lowerHost.startsWith('10.') ||
    lowerHost.startsWith('192.168.') ||
    lowerHost.startsWith('169.254.') ||
    lowerHost.startsWith('172.16.') ||
    lowerHost.startsWith('172.31.')
  ) {
    return false;
  }

  return ALLOWED_HOSTS.some(allowed => lowerHost === allowed || lowerHost.endsWith('.' + allowed));
}

function getDirectGoogleDriveUrl(url) {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  const queryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes('drive.google.com') && queryMatch && queryMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${queryMatch[1]}`;
  }
  return url;
}

module.exports = function handler(req, res) {
  const { url, filename } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid url parameter' });
  }

  let parsedTarget;
  try {
    parsedTarget = new URL(url);
  } catch (e) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }

  // Enforce HTTPS
  if (parsedTarget.protocol !== 'https:') {
    return res.status(400).json({ message: 'Only HTTPS URLs are permitted' });
  }

  // Enforce allowed domains
  if (!isAllowedHost(parsedTarget.hostname)) {
    return res.status(403).json({ message: 'Access to this host is restricted' });
  }

  const targetUrl = getDirectGoogleDriveUrl(url);

  const downloadFile = (currentUrl, redirectCount = 0) => {
    if (redirectCount > 5) {
      return res.redirect(targetUrl);
    }

    try {
      const parsedCurrent = new URL(currentUrl);

      // Verify redirect target host is also allowed
      if (!isAllowedHost(parsedCurrent.hostname) || parsedCurrent.protocol !== 'https:') {
        return res.status(403).json({ message: 'Redirected to an unauthorized host' });
      }

      const options = {
        hostname: parsedCurrent.hostname,
        path: parsedCurrent.pathname + parsedCurrent.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      };

      const request = https.request(options, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          const nextUrl = urlModule.resolve(currentUrl, response.headers.location);
          return downloadFile(nextUrl, redirectCount + 1);
        }

        if (response.statusCode !== 200) {
          return res.redirect(targetUrl);
        }

        const contentType = response.headers['content-type'] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);

        const cleanFilename = filename
          ? String(filename).replace(/[^a-zA-Z0-9.\-_ ]/g, '').substring(0, 100)
          : 'download';
        res.setHeader('Content-Disposition', `attachment; filename="${cleanFilename}"`);

        response.pipe(res);
      });

      request.on('error', (err) => {
        console.error('Download proxy error:', err);
        res.redirect(targetUrl);
      });

      request.end();
    } catch (err) {
      console.error('URI parsing or connection error:', err);
      res.redirect(targetUrl);
    }
  };

  downloadFile(targetUrl);
};

