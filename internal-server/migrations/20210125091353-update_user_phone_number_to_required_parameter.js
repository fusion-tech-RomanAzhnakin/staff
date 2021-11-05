module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'phone', {
    type: Sequelize.STRING,
    allowNull: false,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'phone', {
    type: Sequelize.STRING,
  }),
};
