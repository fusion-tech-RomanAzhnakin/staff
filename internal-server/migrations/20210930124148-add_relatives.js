module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'users',
      'additionalContactName',
      {
        type: Sequelize.STRING,
      }
    ),
    queryInterface.addColumn(
      'users',
      'additionalContactType',
      {
        type: Sequelize.STRING,
      }
    ),
    queryInterface.addColumn(
      'users',
      'additionalContactPhone',
      {
        type: Sequelize.STRING,
      }
    ),
  ]),
  down: queryInterface => Promise.all([
    queryInterface.removeColumn('users', 'additionalContactName'),
    queryInterface.removeColumn('users', 'additionalContactType'),
    queryInterface.removeColumn('users', 'additionalContactPhone'),
  ]),
};
