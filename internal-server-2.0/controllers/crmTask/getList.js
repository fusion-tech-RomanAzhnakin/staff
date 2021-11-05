const { StatusCodes } = require('http-status-codes');

const crmTaskService = require('../../db/services/crmTask');

const getCrmTaskList = async (req, res, next) => {
  try {
    const options = {
      pagination: {
        perPage: req.query.perPage,
        page: req.query.page,
      },
      sort: {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
      },
      filter: req.query.filter,
    };

    const tasks = await crmTaskService.getList(options);

    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (err) {
    err.functionName = getCrmTaskList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getCrmTaskList;
