const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class candidate_columns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.candidate_columns.hasMany(
        models.candidate,
        { foreignKey: 'column_id' },
      );
    }
  }

  candidate_columns.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'candidate_columns',
    paranoid: true,
  });

  return candidate_columns;
};
