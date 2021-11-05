const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class crmRejectReasons extends Model {
    static associate(models) {
      models.crm_reject_reason.hasMany(models.crm_task, {
        foreignKey: 'reject_reason_id',
      });
    }
  }

  crmRejectReasons.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    reason: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
  }, {
    sequelize,
    modelName: 'crm_reject_reason',
  });

  return crmRejectReasons;
};
