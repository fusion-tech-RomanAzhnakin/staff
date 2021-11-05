
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('requests', 'is_unpaid', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }),
  down: queryInterface => queryInterface.removeColumn('requests', 'is_unpaid'),
};
