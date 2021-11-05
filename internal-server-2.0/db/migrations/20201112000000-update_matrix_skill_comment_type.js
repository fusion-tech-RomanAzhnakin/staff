module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('matrix_skill_comments', 'text', {
    type: Sequelize.TEXT,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('matrix_skill_comments', 'text', {
    type: Sequelize.STRING,
  }),
};
