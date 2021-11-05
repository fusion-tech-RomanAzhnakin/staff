const userService = require('../../db/services/user');

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
    if (options.filter && options.filter.techRole) {
      options.filter.tech_role = options.filter.techRole;
      delete options.filter.techRole;
    }

    const users = await userService.getList(options);

    res.json({ data: users });
  } catch (err) {
    err.functionName = getList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getList;
