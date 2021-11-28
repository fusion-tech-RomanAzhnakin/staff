const projectService = require('../../db/services/project');

const getProjectsTech = async (req, res, next) => {
  try {
    const options = {

      include: [
        {
          model: 'technologies',
          attributes: ['title', 'id', 'group_id'],
          as: 'technologies',
        },
      ],
    };

    const technology = await projectService.getTech(options);
    res.json(technology);
  } catch (err) {
    err.functionName = getProjectsTech.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getProjectsTech;
