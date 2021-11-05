const { StatusCodes } = require('http-status-codes');

const { verifyToken, createTokensPair } = require('../../utils/token');
const db = require('../../db');

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    const { id } = verifyToken(token);

    const user = await db.user.findByPk(id);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json('user not found');
    }

    if (user.status === 'disabled') {
      return res.status(StatusCodes.FORBIDDEN).json('user have "disabled" status');
    }

    res.json(createTokensPair(user.id));
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.UNAUTHORIZED).json('invalid');
    }

    if (err.message === 'jwt expired') {
      return res.status(StatusCodes.UNAUTHORIZED).json('expired');
    }

    err.functionName = refreshToken.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = refreshToken;
