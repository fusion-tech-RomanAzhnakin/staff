const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class candidate_technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.candidate_technology.belongsTo(
        models.technologies,
        { foreignKey: 'technology_id' },
      );

      models.candidate_technology.belongsTo(
        models.candidate,
        { foreignKey: 'candidate_id' },
      );
    }
  }

  candidate_technology.init({
    candidate_id: {
      type: DataTypes.INTEGER,
    },
    technology_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'candidate_technology',
    paranoid: true,
  });

  return candidate_technology;
};
