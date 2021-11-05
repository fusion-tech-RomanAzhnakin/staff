const articlesService = require('../../db/services/article');

const getFilteredIdList = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const formattedFilter = {};

    Object.keys(filter || {}).forEach((key) => {
      const value = filter[key];

      if (key === 'added_by') {
        formattedFilter[key] = {
          type: '$or',
          value,
        };
      } else if (key === 'search') {
        formattedFilter.search = {
          type: '$search',
          value,
          fields: [
            'title',
          ],
        };
      }
    });

    const tagsFiltration = {
      id: {
        type: '$in',
        value: filter.tags_id,
      },
    };

    const options = {
      pagination: {
        perPage: req.query.perPage,
        page: req.query.page,
      },
      sort: {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
      },
      filter: {
        mainFilter: formattedFilter,
        includedModelsFilter: {
          tags: tagsFiltration,
        },
      },
    };

    const articles = await articlesService.getFilteredIdList(options);

    res.json(articles);
  } catch (err) {
    err.functionName = getFilteredIdList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getFilteredIdList;
