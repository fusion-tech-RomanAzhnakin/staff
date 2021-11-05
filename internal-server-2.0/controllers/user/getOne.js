const userService = require('../../db/services/user');

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getOne(id);

    res.json(user);
  } catch (err) {
    err.functionName = getOne.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getOne;
