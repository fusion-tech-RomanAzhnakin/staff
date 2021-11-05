const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class user_project extends Model {
    static associate(models) {
      models.user_project.belongsTo(models.project, {
        foreignKey: 'project_id',
      });

      models.user_project.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
    }
  }
  user_project.init(
    {
      project_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'user_project',
    },
  );

  return user_project;
};
