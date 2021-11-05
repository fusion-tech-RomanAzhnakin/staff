const { StatusCodes } = require('http-status-codes');

const projectServices = require('../../db/services/project');

const createRequest = async (req, res, next) => {
  try {
    await projectServices.create(req.body);
    res.status(StatusCodes.CREATED).send();
  } catch (err) {
    err.functionName = createRequest.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = createRequest;
