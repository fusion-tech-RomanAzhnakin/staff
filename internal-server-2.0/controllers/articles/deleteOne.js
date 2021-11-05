const { StatusCodes } = require('http-status-codes');

const articleService = require('../../db/services/article');

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    await articleService.deleteOne(id, req.user);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    if (err.type === 'custom') {
      return res.status(err.code).json(err.message);
    }

    err.functionName = deleteOne.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = deleteOne;
