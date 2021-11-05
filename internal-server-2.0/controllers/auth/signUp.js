const { StatusCodes } = require('http-status-codes');

const userServise = require('../../db/services/user');
const { createTokensPair } = require('../../utils/token');

const signUp = async (req, res, next) => {
  try {
    const {
      email,
      login,
      phone,
      password,
    } = req.body;

    const newUser = await userServise.signUp({
      email,
      login,
      phone,
      password,
    });

    res.status(StatusCodes.CREATED).json({
      ...createTokensPair(newUser.id),
      user: newUser,
    });
  } catch (err) {
    if (err.type === 'custom') {
      return res.status(err.code).json(err.message);
    }

    err.functionName = signUp.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = signUp;
