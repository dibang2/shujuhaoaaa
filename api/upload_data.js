const Storage = require('../lib/storage');

const storage = new Storage();

module.exports = async (req, res) => {
  try {
    const body = req.method === 'POST' ? req.body : {};
    const lines = body.lines || [];
    if (!Array.isArray(lines)) {
      res.status(400).json({ error: 'lines must be an array' });
      return;
    }
    const saved = storage.appendLines(lines);
    res.status(200).json({ saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
};


