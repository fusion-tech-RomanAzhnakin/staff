module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'extraHours',
    'isProcessed',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  ),
  down: queryInterface => queryInterface.removeColumn('extraHours', 'isProcessed'),
};
