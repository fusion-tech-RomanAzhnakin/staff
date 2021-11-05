const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class technologies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.technologies.belongsToMany(models.candidate, {
        through: 'candidate_technology',
        as: 'candidates',
        foreignKey: 'technology_id',
      });

      models.technologies.belongsToMany(models.project, {
        through: models.project_technologies,
        as: 'project',
        foreignKey: 'technology_id',
      });
    }
  }
  technologies.init(
    {
      title: {
        type: Sequelize.STRING,
      },
      group_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'technologies',
    },
  );
  return technologies;
};
