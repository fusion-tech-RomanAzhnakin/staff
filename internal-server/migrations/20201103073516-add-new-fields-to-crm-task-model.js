module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('crm_tasks', 'invite', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    .then(() => queryInterface.addColumn('crm_tasks', 'hot', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }))
    .then(() => queryInterface.addColumn('crm_tasks', 'project_start_date', {
      type: Sequelize.DATE,
    }))
    .then(() => queryInterface.addColumn('crm_tasks', 'project_end_date', {
      type: Sequelize.DATE,
    })),

  down: (queryInterface, Sequelize) => queryInterface
    .removeColumn('crm_tasks', 'invite', {
      type: Sequelize.BOOLEAN,
    })
    .then(() => queryInterface.removeColumn('crm_tasks', 'hot', {
      type: Sequelize.BOOLEAN,
    }))
    .then(() => queryInterface.removeColumn('crm_tasks', 'project_start_date', {
      type: Sequelize.DATE,
    }))
    .then(() => queryInterface.removeColumn('crm_tasks', 'project_end_date', {
      type: Sequelize.DATE,
    })),
};
