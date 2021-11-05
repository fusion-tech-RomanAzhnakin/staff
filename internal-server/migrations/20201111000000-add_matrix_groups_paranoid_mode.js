module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'matrix_groups',
    'deletedAt',
    {
      type: Sequelize.DATE,
    }
  ),

  down: queryInterface => queryInterface.removeColumn('matrix_groups', 'deletedAt'),
};
