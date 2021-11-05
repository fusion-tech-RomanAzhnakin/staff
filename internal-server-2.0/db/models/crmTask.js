const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class crmTasks extends Model {
    static associate(models) {
      models.crm_task.belongsTo(models.crm_column, {
        foreignKey: 'task_in_column',
      });

      models.crm_task.hasMany(models.message, {
        foreignKey: 'crm_tasks_id',
      });

      models.crm_task.belongsTo(models.crm_reject_reason, {
        foreignKey: 'reject_reason_id',
      });

      models.crm_task.hasMany(models.crm_history, {
        foreignKey: 'history_in_task',
      });
    }
  }
  crmTasks.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    title: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    description: {
      type: Sequelize.TEXT,
    },

    subscription: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    },

    comment: {
      type: Sequelize.STRING,
    },

    task_in_column: {
      type: Sequelize.INTEGER,
    },

    lid_company: {
      type: Sequelize.STRING,
    },

    lid_contact_name: {
      type: Sequelize.STRING,
    },

    lid_email: {
      type: Sequelize.STRING,
    },

    lid_skype: {
      type: Sequelize.STRING,
    },

    lid_phone: {
      type: Sequelize.STRING,
    },

    lid_location: {
      type: Sequelize.STRING,
    },

    lid_time_zone: {
      type: Sequelize.INTEGER,
    },

    additional_info_field: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },

    additional_info_data: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },

    budget: {
      type: Sequelize.STRING,
    },

    proposal_link: {
      type: Sequelize.STRING,
    },

    project_folder_path: {
      type: Sequelize.TEXT,
    },

    technologies: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },

    archive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    proposal: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    contract: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    event_datetime: {
      type: Sequelize.DATE,
    },

    event_description: {
      type: Sequelize.STRING,
    },

    reject_reason_comment: {
      type: Sequelize.STRING,
    },

    reject_reason_date: {
      type: Sequelize.DATE,
    },

    job_link: {
      type: Sequelize.STRING,
    },

    stage_ts: {
      type: Sequelize.DATE,
    },

    invite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    hot: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    project_start_date: {
      type: Sequelize.DATE,
    },

    project_end_date: {
      type: Sequelize.DATE,
    },
  }, {
    sequelize,
    modelName: 'crm_task',
  });

  return crmTasks;
};
