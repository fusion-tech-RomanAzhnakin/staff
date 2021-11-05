module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('matrix_skills', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    section_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'matrix_sections',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    level: {
      type: Sequelize.ENUM('junior', 'middle', 'senior'),
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
  down: queryInterface => queryInterface.dropTable('matrix_skills'),
};
