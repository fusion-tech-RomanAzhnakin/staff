module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'users',
      'isDev',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('users', 'isDev'),
  ]),
};
