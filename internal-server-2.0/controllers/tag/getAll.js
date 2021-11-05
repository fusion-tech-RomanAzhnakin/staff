const tagService = require('../../db/services/tag');

const getAll = async (req, res, next) => {
  try {
    const options = {
      sort: {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
      },
    };

    const tags = await tagService.getAll(options);

    res.json(tags);
  } catch (err) {
    err.functionName = getAll.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getAll;
