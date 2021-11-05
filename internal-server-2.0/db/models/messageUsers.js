const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class messages_user extends Model {
    static associate(models) {
      models.messages_user.belongsTo(models.message, {
        foreignKey: 'message_id',
      });
    }
  }
  messages_user.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readed_date: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'messages_user',
  });

  return messages_user;
};
