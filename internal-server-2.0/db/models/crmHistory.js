const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class crmHistory extends Model {
    static associate(models) {
      models.crm_history.belongsTo(models.crm_task, {
        foreignKey: 'history_in_task',
      });
    }
  }

  crmHistory.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    event: {
      type: Sequelize.TEXT,
      notEmpty: true,
    },

    moved_to_stage: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'crm_history',
  });

  return crmHistory;
};
