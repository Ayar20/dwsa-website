const https = require('https');
const urlModule = require('url');

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

  if (!url) {
    return res.status(400).json({ message: 'Missing url parameter' });
  }

  const targetUrl = getDirectGoogleDriveUrl(url);

  const downloadFile = (currentUrl, redirectCount = 0) => {
    if (redirectCount > 5) {
      return res.redirect(targetUrl);
    }

    try {
      const parsedUrl = urlModule.parse(currentUrl);
      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
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
          ? filename.replace(/[^a-zA-Z0-9.\-_ ]/g, '')
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
