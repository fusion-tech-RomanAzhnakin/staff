const projectService = require('../../db/services/project');

const getProjectsList = async (req, res, next) => {
  try {
    const options = {
      pagination: req.query.pagination,
      sort: req.query.sort,
      filter: req.query.filter,
      // include: req.query.include,
      include: [
        {
          model: 'user',
          attributes: ['login', 'firstName', 'lastName', 'firstName_ru', 'lastName_ru', 'id'],
          as: 'user',
          through: {
            attributes: [],
          },
        },
        {
          model: 'technologies',
          attributes: ['title', 'id'],
          as: 'technologies',
          through: {
            attributes: [],
          },
        },
        {
          model: 'project_technologies',
          attributes: [],
          as: 'technologies_relation',
        },
        {
          model: 'user_project',
          attributes: [],
          as: 'user_relation',
        },
      ],
    };

    const formattedFilter = {};
    if (req.query.filter.user && req.query.filter.user.length) {
      formattedFilter['$user_relation.user_id$[in]'] = req.query.filter.user;
    }
    if (req.query.filter.technologies && req.query.filter.technologies.length) {
      formattedFilter['$technologies_relation.technology_id$[in]'] = req.query.filter.technologies;
    }
    if (req.query.filter.search) {
      const searchString = `%${req.query.filter.search}%`;
      formattedFilter['[or]'] = [
        { 'title[iLike]': searchString },
        { 'description[iLike]': searchString },
        { 'description_ru[iLike]': searchString },
      ];
    }

    options.filter = formattedFilter;
    const projects = await projectService.getList(options);
    res.json(projects);
  } catch (err) {
    err.functionName = getProjectsList.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getProjectsList;
