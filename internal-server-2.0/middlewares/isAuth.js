const { StatusCodes } = require('http-status-codes');

const { verifyToken } = require('../utils/token');
const errorHandler = require('../utils/errorHandler');
const db = require('../db');

const isAuth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '');

    const { id } = verifyToken(token);

    const user = await db.user.findByPk(id);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json('user not found');
    }

    if (user.status === 'disabled') {
      return res.status(StatusCodes.FORBIDDEN).json('user have "disabled" status');
    }

    if (req.originalUrl !== '/api/v2/auth/me' && user.status === 'registered') {
      return res.status(StatusCodes.FORBIDDEN);
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.UNAUTHORIZED).json('invalid');
    }

    if (err.message === 'jwt expired') {
      return res.status(StatusCodes.UNAUTHORIZED).json('expired');
    }

    err.functionName = isAuth.name;
    err.fileName = __filename;
    errorHandler(err, req, res, next);
  }
};

module.exports = isAuth;
