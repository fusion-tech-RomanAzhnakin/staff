const articlesService = require('../../db/services/article');

const getList = async (req, res, next) => {
  try {
    const options = {
      sort: {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
      },
    };

    const articles = await articlesService.getList(options);

    res.json(articles);
  } catch (err) {
    err.functionName = getList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getList;
