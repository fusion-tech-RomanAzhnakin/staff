module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn('crm_tasks', 'lid_time_zone', {
    type: Sequelize.STRING,
  }),

  down: async (queryInterface, Sequelize) => queryInterface.changeColumn('crm_tasks', 'lid_time_zone', {
    type: Sequelize.INTEGER,
  }),
};
