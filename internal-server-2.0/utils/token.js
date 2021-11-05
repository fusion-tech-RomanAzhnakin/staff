const jwt = require('jsonwebtoken');

const config = require('../config');

const createAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(
    payload,
    config.token.secret,
    { expiresIn: config.token.accessExpires },
  );
};

const createRefreshToken = (id) => {
  const payload = { id };
  return jwt.sign(
    payload,
    config.token.secret,
    { expiresIn: config.token.refreshExpires },
  );
};

const createTokensPair = (id) => {
  return {
    access: createAccessToken(id),
    refresh: createRefreshToken(id),
  };
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, config.token.secret);

  return payload;
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  createTokensPair,
  verifyToken,
};
