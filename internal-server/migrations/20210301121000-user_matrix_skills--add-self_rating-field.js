module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('user_matrix_skills', 'self_rating', {
    type: Sequelize.ENUM('none', 'low', 'high'),
  }),

  down: async (queryInterface) => {
    await queryInterface.removeColumn('user_matrix_skills', 'self_rating');
    await queryInterface.sequelize.query('drop type enum_user_matrix_skills_self_rating;');
  },
};
