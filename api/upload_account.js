const Storage = require('../lib/storage');

const storage = new Storage();

module.exports = async (req, res) => {
  try {
    const body = req.method === 'POST' ? req.body : {};
    const account = body.account;
    if (!account) {
      res.status(400).json({ error: 'account required' });
      return;
    }
    const key = storage.saveAccount(account);
    res.status(200).json({ key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
};


