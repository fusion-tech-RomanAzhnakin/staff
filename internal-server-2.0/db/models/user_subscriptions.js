const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user_subscriptions.belongsTo(
        models.technologies,
        { foreignKey: 'user_id' },
      );

      models.user_subscriptions.belongsTo(
        models.candidate,
        { foreignKey: 'candidate_id' },
      );
    }
  }

  user_subscriptions.init({
    candidate_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'user_subscriptions',
    paranoid: true,
  });

  return user_subscriptions;
};
