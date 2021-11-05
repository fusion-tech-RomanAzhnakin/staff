const { StatusCodes } = require('http-status-codes');

const userService = require('../../db/services/user');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newData = {
      login: req.body.login,
      phone: req.body.phone,
      slack_name: req.body.slack_name,
      email: req.body.email,
      firstName: req.body.firstName,
      firstName_ru: req.body.firstName_ru,
      lastName: req.body.lastName,
      lastName_ru: req.body.lastName_ru,
      education: req.body.education,
      education_ru: req.body.education_ru,
      info: req.body.info,
      repo: req.body.repo,
      DoB: req.body.DoB,
    };

    if (req.user.id !== +id && req.user.role !== 'admin') {
      return res.status(StatusCodes.FORBIDDEN);
    }

    const update = await userService.update(+id, newData);

    return res.json(update);
  } catch (err) {
    if (err.type === 'custom') {
      return res.status(err.code).json(err.message);
    }

    err.functionName = update.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = update;
