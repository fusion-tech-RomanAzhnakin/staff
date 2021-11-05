const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class requestUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/* models */) {
      //
    }
  }
  requestUser.init({
    user_id: {
      type: Sequelize.INTEGER,
    },
    request_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'request_user',
  });
  return requestUser;
};
