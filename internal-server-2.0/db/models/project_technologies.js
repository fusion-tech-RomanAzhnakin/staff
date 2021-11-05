const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class project_technologies extends Model {
    static associate(models) {
      models.project_technologies.belongsTo(models.project, {
        foreignKey: 'project_id',
      });

      models.project_technologies.belongsTo(models.technologies, {
        foreignKey: 'technology_id',
      });
    }
  }
  project_technologies.init(
    {
      project_id: {
        type: Sequelize.INTEGER,
      },
      technology_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'project_technologies',
    },
  );

  return project_technologies;
};
