const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');

class Storage {
  constructor(baseDir) {
    const base = baseDir || process.env.VERCEL_TEMP || '.data';
    if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });
    this.base = base;
    this.dataFile = path.join(this.base, 'data_lines.txt');
    this.accountsFile = path.join(this.base, 'accounts.json');
    if (!fs.existsSync(this.accountsFile)) fs.writeFileSync(this.accountsFile, JSON.stringify({}), 'utf8');
  }

  appendLines(lines) {
    const stream = fs.createWriteStream(this.dataFile, { flags: 'a', encoding: 'utf8' });
    for (const line of lines) {
      stream.write(String(line).replace(/\r?\n/g, '') + '\n');
    }
    stream.end();
    return lines.length;
  }

  saveAccount(account) {
    const accounts = JSON.parse(fs.readFileSync(this.accountsFile, 'utf8')) || {};
    const key = randomBytes(16).toString('hex');
    accounts[key] = account;
    fs.writeFileSync(this.accountsFile, JSON.stringify(accounts), 'utf8');
    return key;
  }

  getAccount(key) {
    const accounts = JSON.parse(fs.readFileSync(this.accountsFile, 'utf8')) || {};
    return accounts[key] || null;
  }
}

module.exports = Storage;


