module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_matrix_skills', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    matrix_skill_id: {
      type: Sequelize.INTEGER,
    },
    knowledge_level: {
      type: Sequelize.ENUM('low', 'high'),
    },
    comment: {
      type: Sequelize.TEXT,
    },
    learn_sources: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_matrix_skills');
    queryInterface.sequelize.query('drop type enum_user_matrix_skills_knowledge_level');
  },
};
