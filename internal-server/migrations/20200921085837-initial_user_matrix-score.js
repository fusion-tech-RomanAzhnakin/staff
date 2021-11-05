module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_matrix_score', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    base: {
      type: Sequelize.INTEGER,
    },
    front_base: {
      type: Sequelize.INTEGER,
    },
    front_extra: {
      type: Sequelize.INTEGER,
    },
    back_base: {
      type: Sequelize.INTEGER,
    },
    back_extra: {
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('user_matrix_score'),
};
