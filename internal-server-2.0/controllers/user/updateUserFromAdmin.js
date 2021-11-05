// const { StatusCodes } = require('http-status-codes');

const usersService = require('../../db/services/user');

const updateUserFromAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateUserFromAdmin = await usersService.updateUserFromAdmin(+id, req.body);

    res.json(updateUserFromAdmin);
  } catch (err) {
    err.functionName = updateUserFromAdmin.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = updateUserFromAdmin;
