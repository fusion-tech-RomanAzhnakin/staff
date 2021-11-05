const technologyService = require('../../db/services/technology');

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

    const technologies = await technologyService.getList(options);

    return res.json({ data: technologies });
  } catch (err) {
    err.functionName = getList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getList;
