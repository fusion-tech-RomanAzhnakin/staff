const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class messagesUsers extends Model {
    static associate(models) {
      models.messages_user.belongsTo(models.message, {
        foreignKey: 'message_id',
      });
    }
  }

  messagesUsers.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    message_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    readed_date: {
      type: Sequelize.DATE,
    },
  }, {
    sequelize,
    modelName: 'messages_user',
  });

  return messagesUsers;
};
