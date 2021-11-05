const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.candidate.belongsTo(
        models.user,
        {
          foreignKey: 'hr_id',
          as: 'hr',
        },
      );

      models.candidate.belongsToMany(models.user, {
        through: models.user_subscriptions,
        as: 'subscribers',
        foreignKey: 'candidate_id',
      });

      models.candidate.belongsTo(
        models.candidate_columns,
        { foreignKey: 'column_id' },
      );

      models.candidate.belongsToMany(
        models.technologies,
        {
          through: 'candidate_technology',
          as: 'technologies',
          foreignKey: 'candidate_id',
        },
      );
    }
  }

  candidate.init({
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    social: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    job_experience: {
      type: Sequelize.TEXT,
    },
    repo: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    english_level: {
      type: Sequelize.ENUM('beginner', 'elementary', 'intermediate', 'upperIntermediate', 'advanced', 'proficiency'),
    },
    additional_info: {
      type: Sequelize.TEXT,
    },
    army: {
      type: Sequelize.BOOLEAN,
    },
    studying: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'candidate',
    paranoid: true,
  });

  return candidate;
};
