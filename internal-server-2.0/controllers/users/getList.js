const usersService = require('../../db/services/user');

const getUsersList = async (req, res, next) => {
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
      filter: JSON.parse(req.query.filter || {}),
    };

    const users = await usersService.getList(options);

    res.json(users);
  } catch (err) {
    err.functionName = getUsersList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getUsersList;
