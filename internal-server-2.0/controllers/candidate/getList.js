const candidateService = require('../../db/services/candidate');

const getList = async (req, res, next) => {
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

    const candidates = await candidateService.getList(options);

    res.json({ data: candidates });
  } catch (err) {
    err.functionName = getList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getList;
