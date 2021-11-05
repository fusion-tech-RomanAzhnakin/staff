module.exports = (sequelize, Sequelize) => {
  const MatrixSkillComment = sequelize.define('matrix_skill_comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_matrix_skill_id: {
      type: Sequelize.INTEGER,
    },
    created_by: {
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.TEXT,
    },
  });

  MatrixSkillComment.associate = (models) => {
    models.matrix_skill_comments.belongsTo(models.user_matrix_skills, {
      foreignKey: 'id',
    });
    models.user.belongsTo(models.user_matrix_skills, {
      foreignKey: 'id',
    });
  };

  return MatrixSkillComment;
};
