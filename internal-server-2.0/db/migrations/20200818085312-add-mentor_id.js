module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'mentor_id',
    {
      type: Sequelize.INTEGER,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn('users', 'mentor_id'),
};
