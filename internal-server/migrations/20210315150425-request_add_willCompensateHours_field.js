module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('requests', 'willCompensateHours', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('requests', 'willCompensateHours', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }),
};
