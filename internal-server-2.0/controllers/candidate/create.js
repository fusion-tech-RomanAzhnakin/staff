const { StatusCodes } = require('http-status-codes');

const candidateService = require('../../db/services/candidate');

const create = async (req, res, next) => {
  try {
    let candidate = await candidateService.create(req.body);

    candidate = await candidateService.getOne(candidate.id);

    res.status(StatusCodes.CREATED).json({ data: candidate });
  } catch (err) {
    err.functionName = create.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = create;
