module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'users',
      'workingFrom',
      {
        type: Sequelize.DATE,
      }
    ),
  ]),
  down: queryInterface => Promise.all([
    queryInterface.removeColumn('users', 'workingFrom'),
  ]),
};
