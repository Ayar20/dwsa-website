const https = require('https');
const urlModule = require('url');

function getDirectGoogleDriveUrl(url) {
  // Matches /file/d/ID/view or /file/d/ID/edit etc.
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  // Matches id=ID in query parameter
  const queryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes('drive.google.com') && queryMatch && queryMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${queryMatch[1]}`;
  }
  return url;
}

export default function handler(req, res) {
  const { url, filename } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'Missing url parameter' });
  }

  // Convert Google Drive links to direct download links
  const targetUrl = getDirectGoogleDriveUrl(url);

  // Helper function to perform the request (supporting redirects)
  const downloadFile = (currentUrl, redirectCount = 0) => {
    if (redirectCount > 5) {
      return res.redirect(targetUrl); // Fallback redirection if too many redirects
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
        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          const nextUrl = urlModule.resolve(currentUrl, response.headers.location);
          return downloadFile(nextUrl, redirectCount + 1);
        }

        if (response.statusCode !== 200) {
          // Fallback to direct redirect if status is not 200
          return res.redirect(targetUrl);
        }

        // Forward content-type header if present
        const contentType = response.headers['content-type'] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        
        // Clean filename (remove characters that might break header)
        const cleanFilename = filename 
          ? filename.replace(/[^a-zA-Z0-9.-_ ]/g, '') 
          : 'download';
        res.setHeader('Content-Disposition', `attachment; filename="${cleanFilename}"`);

        // Stream the file chunk by chunk to the response
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
}
