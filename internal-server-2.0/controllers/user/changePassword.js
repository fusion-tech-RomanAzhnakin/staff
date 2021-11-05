const { StatusCodes } = require('http-status-codes');

const userService = require('../../db/services/user');

const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newData = {
      oldPassword: req.body.oldPassword,
      password: req.body.password,
    };

    if (req.user.id !== +id) {
      return res.status(StatusCodes.FORBIDDEN);
    }

    await userService.changePassword(+id, newData);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    if (err.type === 'custom') {
      return res.status(err.code).json(err.message);
    }

    err.functionName = changePassword.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = changePassword;
