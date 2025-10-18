const Storage = require('../lib/storage');

const storage = new Storage();

module.exports = async (req, res) => {
  try {
    const body = req.method === 'POST' ? req.body : {};
    const key = body.key;
    if (!key) {
      res.status(400).json({ error: 'key required' });
      return;
    }
    const account = storage.getAccount(key);
    if (!account) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
};


