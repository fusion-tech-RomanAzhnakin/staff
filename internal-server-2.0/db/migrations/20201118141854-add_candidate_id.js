module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('messages', 'candidate_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'candidates',
      key: 'id',
    },
  }),

  down: (queryInterface) => queryInterface.removeColumn('messages', 'candidate_id'),
};
