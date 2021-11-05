const crypto = require('crypto');
const config = require('../config');

const hash = (password) => {
  return crypto
    .createHmac(config.hash.type, config.hash.key)
    .update(password.trim())
    .digest('hex');
};

module.exports = hash;
