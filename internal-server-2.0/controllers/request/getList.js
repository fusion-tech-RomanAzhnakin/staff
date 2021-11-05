const requestService = require('../../db/services/request');

const getRequestsList = async (req, res, next) => {
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

    const requests = await requestService.getList(options);

    res.json({ data: requests });
  } catch (err) {
    err.functionName = getRequestsList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getRequestsList;
