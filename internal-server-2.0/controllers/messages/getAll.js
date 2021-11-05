const { StatusCodes } = require('http-status-codes');

const messagesService = require('../../db/services/messages');

const getAll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const messages = await messagesService.getList(id);

    res.status(StatusCodes.OK).json({ data: messages });
  } catch (err) {
    err.functionName = getAll.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getAll;
