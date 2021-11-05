module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('taskJobs', 'level', {
    type: Sequelize.ENUM('base', 'medium', 'final', 'probation'),
  }),

  down: async (queryInterface) => {
    await queryInterface.removeColumn('taskJobs', 'level');
    await queryInterface.sequelize.query('drop type enum_taskJob_level');
  },
};
