const { StatusCodes } = require('http-status-codes');

const tagService = require('../../db/services/tag');

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    await tagService.deleteOne(id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    err.functionName = deleteOne.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = deleteOne;
