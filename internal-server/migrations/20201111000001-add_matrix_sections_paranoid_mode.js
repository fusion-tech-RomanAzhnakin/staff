module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'matrix_sections',
    'deletedAt',
    {
      type: Sequelize.DATE,
    }
  ),

  down: queryInterface => queryInterface.removeColumn('matrix_sections', 'deletedAt'),
};
