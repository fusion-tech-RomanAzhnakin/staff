module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidate_columns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('candidate_columns');
  },
};
