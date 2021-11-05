const candidateColumnsService = require('../../db/services/candidateColumns');

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

    const columns = await candidateColumnsService.getList(options);

    res.json({ data: columns });
  } catch (err) {
    err.functionName = getList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getList;
