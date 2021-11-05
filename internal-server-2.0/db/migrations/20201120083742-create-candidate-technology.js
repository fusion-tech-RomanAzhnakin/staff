module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidate_technologies', {
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

      candidate_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidates',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      technology_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'technologies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('candidate_technologies');
  },
};
