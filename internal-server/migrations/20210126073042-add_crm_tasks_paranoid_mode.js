module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'crm_tasks',
    'deletedAt',
    {
      type: Sequelize.DATE,
    }
  ),


  down: queryInterface => queryInterface.removeColumn('crm_tasks', 'deletedAt'),
};
