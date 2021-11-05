const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.request.belongsToMany(models.user, {
        through: {
          model: models.request_user,
          unique: false,
        },
        as: 'user',
        foreignKey: 'request_id',
      });

      models.request.belongsTo(models.user, {
        as: 'admin_who_updated_id',
        foreignKey: 'updated_by',
      });
    }
  }
  request.init({
    title: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.ENUM('technical', 'vacation', 'medical', 'dayOff', 'common', 'documents'),
      notEmpty: true,
    },
    dateFrom: {
      type: Sequelize.DATE,
    },
    dateTo: {
      type: Sequelize.DATE,
    },
    dates: {
      type: Sequelize.ARRAY(Sequelize.DATE),
    },
    comment: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.ENUM('wait', 'completed', 'denied', 'inProgress', 'accept'),
      notEmpty: true,
      defaultValue: 'wait',
    },
    deniedComment: {
      type: Sequelize.TEXT,
    },
    rest_days_number: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};
