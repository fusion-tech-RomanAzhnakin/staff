const {
  Model,
} = require('sequelize');

const hash = require('../../utils/hash');
const { updateImageUrl } = require('../../utils/helpers');

module.exports = (sequelize, Sequelize) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongsToMany(models.request, {
        through: {
          model: models.request_user,
          unique: false,
        },
        foreignKey: 'user_id',
      });

      models.user.belongsToMany(models.candidate, {
        through: models.user_subscriptions,
        foreignKey: 'user_id',
        as: 'subscriptions',
      });

      models.user.belongsToMany(models.project, {
        through: models.user_project,
        foreignKey: 'user_id',
        as: 'project',
      });
    }
  }
  user.init(
    {
      firstName: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      firstName_ru: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      lastName: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      lastName_ru: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      education: {
        type: Sequelize.TEXT,
      },

      education_ru: {
        type: Sequelize.TEXT,
      },

      login: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      info: {
        type: Sequelize.TEXT,
      },

      phone: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        // Add later in the migrations
        // unique: true,
        // notEmpty: true,
        // allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(password) {
          return this.setDataValue('password', hash(password));
        },
      },

      role: {
        type: Sequelize.ENUM('student', 'user', 'hr', 'sales', 'admin', 'mentor', 'officeManager'),
        defaultValue: 'user',
      },

      tech_role: {
        type: Sequelize.ENUM('admin', 'sales', 'techLead', 'projectManager', 'developer', 'designer', 'qaEngineer', 'hr', 'officeManager', 'englishTeacher'),
        allowNull: true,
      },

      avatar: {
        type: Sequelize.STRING,
        get: updateImageUrl,
      },

      avatarThumbnail: {
        type: Sequelize.STRING,
        get: updateImageUrl,
      },

      status: {
        type: Sequelize.ENUM('registered', 'active', 'disabled'),
        defaultValue: 'registered',
      },

      DoB: {
        type: Sequelize.DATE,
      },

      slack_name: {
        type: Sequelize.STRING,
      },

      resetPasswordToken: {
        type: Sequelize.TEXT,
      },

      resetPasswordExpires: {
        type: Sequelize.DATE,
      },

      slack_conversational_id: {
        type: Sequelize.STRING,
      },

      slack_conversational_crm_id: {
        type: Sequelize.STRING,
      },

      repo: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      isDev: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'],
        },
      },
    },
  );
  return user;
};
