const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class crmColumns extends Model {
    static associate(/* models */) {
      //
    }
  }

  crmColumns.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    title: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    idChain: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'crm_column',
  });

  return crmColumns;
};
