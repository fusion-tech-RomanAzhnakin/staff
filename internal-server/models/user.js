module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

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
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
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
    },

    avatarThumbnail: {
      type: Sequelize.STRING,
    },

    status: {
      type: Sequelize.ENUM('registered', 'active', 'disabled'),
      defaultValue: 'registered',
    },

    DoB: {
      type: Sequelize.DATE,
    },

    workingFrom: {
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

    last_activity: {
      type: Sequelize.DATE,
    },

    additionalContactName: {
      type: Sequelize.STRING,
    },

    additionalContactType: {
      type: Sequelize.STRING,
    },

    additionalContactPhone: {
      type: Sequelize.STRING,
    },
  });

  User.associate = (models) => {
    models.user.belongsToMany(models.project, {
      through: {
        model: models.user_project,
        unique: false,
      },
      foreignKey: 'user_id',
    });

    models.user.belongsToMany(models.request, {
      through: {
        model: models.request_user,
        unique: false,
      },
      foreignKey: 'user_id',
    });

    models.user.belongsToMany(models.plan, {
      through: {
        model: models.user_plan,
        unique: false,
      },
      foreignKey: 'user_id',
    });

    models.user.belongsToMany(models.event, {
      through: {
        model: models.user_event,
        unique: false,
      },
      foreignKey: 'user_id',
    });

    models.user.hasMany(models.message, {
      as: 'my_message',
      foreignKey: 'author_id',
    });
    models.user.hasMany(models.matrix_skill_comments, {
      foreignKey: 'created_by',
    });

    models.user.belongsToMany(models.message, {
      as: 'subscribed',
      through: {
        model: models.messages_user,
        unique: true,
      },
      foreignKey: 'user_id',
    });

    models.user.hasMany(models.subscription_notification, {
      foreignKey: 'user_id',
    });

    models.user.hasMany(models.user, {
      foreignKey: 'mentor_id',
    });
  };

  return User;
};
