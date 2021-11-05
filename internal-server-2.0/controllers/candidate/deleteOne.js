const { StatusCodes } = require('http-status-codes');

const candidateService = require('../../db/services/candidate');

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidate = await candidateService.deleteOne(id);

    res.status(StatusCodes.OK).json({ data: candidate });
  } catch (err) {
    err.functionName = deleteOne.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = deleteOne;
