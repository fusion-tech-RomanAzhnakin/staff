module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('taskJobs', 'time_limits', {
    type: Sequelize.INTEGER,
  }),

  down: queryInterface => queryInterface.removeColumn('taskJobs', 'time_limits'),
};
