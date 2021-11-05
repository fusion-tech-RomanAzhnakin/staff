module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'matrix_skills',
    'deletedAt',
    {
      type: Sequelize.DATE,
    }
  ),


  down: queryInterface => queryInterface.removeColumn('matrix_skills', 'deletedAt'),
};
