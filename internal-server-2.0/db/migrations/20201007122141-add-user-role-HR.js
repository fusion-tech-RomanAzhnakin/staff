module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn(
    'users',
    'role',
    {
      type: Sequelize.STRING,
    },
  )
    .then(() => queryInterface.sequelize.query('drop type enum_users_role;'))
    .then(() => queryInterface.changeColumn(
      'users',
      'role',
      {
        type: Sequelize.ENUM('student', 'user', 'hr', 'sales', 'admin'),
      },
    )),

  down: async (queryInterface, Sequelize) => queryInterface.changeColumn(
    'users',
    'role',
    {
      type: Sequelize.STRING,
    },
  )
    .then(() => queryInterface.sequelize.query('drop type enum_users_role;'))
    .then(() => queryInterface.changeColumn(
      'users',
      'role',
      {
        type: Sequelize.ENUM('student', 'user', 'sales', 'admin'),
      },
    )),
};
