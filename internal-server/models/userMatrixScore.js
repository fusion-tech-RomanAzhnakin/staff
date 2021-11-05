module.exports = (sequelize, Sequelize) => {
  const UserMatrixScore = sequelize.define('user_matrix_score', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  });
  return UserMatrixScore;
};
