module.exports = (sequelize, Sequelize) => {
  const UserMatrixSkill = sequelize.define('user_matrix_skills', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    self_rating: {
      type: Sequelize.ENUM('none', 'low', 'high'),
    },
    comment: {
      type: Sequelize.TEXT,
    },
    learn_sources: {
      type: Sequelize.TEXT,
    },
  });

  UserMatrixSkill.associate = (models) => {
    // associations can be defined here
    models.user_matrix_skills.belongsTo(models.matrix_skills, {
      foreignKey: 'id',
    });
    models.user_matrix_skills.hasMany(models.matrix_skill_comments, {
      foreignKey: 'user_matrix_skill_id',
    });
  };

  return UserMatrixSkill;
};
