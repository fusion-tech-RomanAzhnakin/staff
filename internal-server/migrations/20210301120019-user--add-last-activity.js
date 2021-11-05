module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'last_activity', {
    type: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.removeColumn('users', 'last_activity'),
};
