const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class message extends Model {
    static associate(models) {
      models.message.belongsTo(models.user, {
        foreignKey: 'author_id',
        as: 'author',
      });

      // models.message.belongsTo(models.crm_tasks, {
      //   foreignKey: 'crm_tasks_id',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
      models.message.belongsTo(models.candidate, {
        foreignKey: 'candidate_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      models.message.belongsTo(models.crm_task, {
        foreignKey: 'crm_tasks_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      models.message.belongsToMany(models.user, {
        as: 'subscribers',
        through: {
          model: models.messages_user,
          unique: true,
        },
        foreignKey: 'message_id',
        onDelete: 'CASCADE',
      });

      models.message.hasMany(models.messages_user, {
        as: 'message_user_info',
        foreignKey: 'message_id',
      });
    }
  }

  message.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.TEXT,
      notEmpty: true,
    },
    files: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER,
    },
    crm_tasks_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'message',
  });

  return message;
};
