const { StatusCodes } = require('http-status-codes');

const candidateSubscribersService = require('../../db/services/candidateSubscribers');
const candidateService = require('../../db/services/candidate');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await candidateSubscribersService.update(id, data);

    const { subscribers } = await candidateService.getOne(id);

    res.status(StatusCodes.OK).json(subscribers);
  } catch (err) {
    err.functionName = update.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = update;
