const { StatusCodes } = require('http-status-codes');

const projectServices = require('../../db/services/project');

const editRequest = async (req, res, next) => {
  try {
    await projectServices.edit(req.body);
    res.status(StatusCodes.OK).send();
  } catch (err) {
    err.functionName = editRequest.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = editRequest;
