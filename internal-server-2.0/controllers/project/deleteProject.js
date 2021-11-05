const { StatusCodes } = require('http-status-codes');

const projectServices = require('../../db/services/project');

const deleteRequest = async (req, res, next) => {
  try {
    await projectServices.deleteProject(req.query.id);
    res.status(StatusCodes.OK).send();
  } catch (err) {
    err.functionName = deleteRequest.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = deleteRequest;
