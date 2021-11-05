const { StatusCodes } = require('http-status-codes');

const candidateService = require('../../db/services/candidate');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let candidate = await candidateService.update(id, data);

    candidate = await candidateService.getOne(id);

    res.status(StatusCodes.OK).json({ data: candidate });
  } catch (err) {
    err.functionName = update.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = update;
