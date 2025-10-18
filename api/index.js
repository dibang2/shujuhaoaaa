const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const indexPath = path.join(process.cwd(), 'index.html');
    if (!fs.existsSync(indexPath)) {
      res.status(404).send('<h1>index.html not found</h1>');
      return;
    }
    const html = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal');
  }
};


