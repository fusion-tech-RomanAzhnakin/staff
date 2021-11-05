module.exports = (sequelize, DataTypes) => {
  const crm_tasks = sequelize.define(
    'crm_tasks',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      title: {
        type: DataTypes.STRING,
        notEmpty: true,
      },

      description: {
        type: DataTypes.TEXT,
      },

      subscription: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },

      comment: {
        type: DataTypes.STRING,
      },

      task_in_column: {
        type: DataTypes.INTEGER,
      },

      lid_company: {
        type: DataTypes.STRING,
      },

      lid_contact_name: {
        type: DataTypes.STRING,
      },

      lid_email: {
        type: DataTypes.STRING,
      },

      lid_skype: {
        type: DataTypes.STRING,
      },

      lid_phone: {
        type: DataTypes.STRING,
      },

      lid_location: {
        type: DataTypes.STRING,
      },

      lid_time_zone: {
        type: DataTypes.INTEGER,
      },

      additional_info_field: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      additional_info_data: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      budget: {
        type: DataTypes.STRING,
      },

      proposal_link: {
        type: DataTypes.STRING,
      },

      project_folder_path: {
        type: DataTypes.TEXT,
      },

      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      archive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      proposal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      contract: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      event_datetime: {
        type: DataTypes.DATE,
      },

      event_description: {
        type: DataTypes.STRING,
      },

      reject_reason_comment: {
        type: DataTypes.STRING,
      },

      reject_reason_date: {
        type: DataTypes.DATE,
      },

      job_link: {
        type: DataTypes.STRING,
      },

      stage_ts: {
        type: DataTypes.DATE,
      },

      invite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      hot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      project_start_date: {
        type: DataTypes.DATE,
      },

      project_end_date: {
        type: DataTypes.DATE,
      },

      dedicated_seller: {
        type: DataTypes.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );
  crm_tasks.associate = (models) => {
    models.crm_tasks.belongsTo(models.crm_columns, {
      foreignKey: 'task_in_column',
    });

    models.crm_tasks.hasMany(models.message, {
      foreignKey: 'crm_tasks_id',
    });

    models.crm_tasks.belongsTo(models.crm_reject_reasons, {
      foreignKey: 'reject_reason_id',
    });

    models.crm_tasks.hasMany(models.crm_history, {
      foreignKey: 'history_in_task',
    });
  };

  return crm_tasks;
};
