const crypto = require('crypto');
const config = require('../config/index');

const hashPassword = password => crypto.createHmac(config.hashType, config.hashKey).update(password).digest('hex');

module.exports = hashPassword;
