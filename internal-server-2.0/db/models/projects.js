const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class project extends Model {
    static associate(models) {
      models.project.belongsToMany(models.user, {
        through: models.user_project,
        as: 'user',
        foreignKey: 'project_id',
      });

      models.project.hasMany(models.project_technologies, {
        as: 'technologies_relation',
        foreignKey: 'project_id',
      });

      models.project.belongsToMany(models.technologies, {
        through: models.project_technologies,
        as: 'technologies',
        foreignKey: 'project_id',
      });

      models.project.hasMany(models.user_project, {
        as: 'user_relation',
        foreignKey: 'project_id',
      });
    }
  }
  project.init(
    {
      title: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      href: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      description_ru: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
    },
    {
      sequelize,
      modelName: 'project',
    },
  );
  return project;
};
