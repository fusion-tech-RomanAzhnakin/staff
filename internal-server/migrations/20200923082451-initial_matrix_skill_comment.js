module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('matrix_skill_comments', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_matrix_skill_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_matrix_skills',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    created_by: {
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('matrix_skill_comments'),
};
