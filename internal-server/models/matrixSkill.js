module.exports = (sequelize, Sequelize) => {
  const MatrixSkill = sequelize.define('matrix_skills', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    section_id: {
      type: Sequelize.INTEGER,
    },
    level: {
      type: Sequelize.ENUM('junior', 'middle', 'senior'),
    },
  }, {
    paranoid: true,
  });

  MatrixSkill.associate = (models) => {
    models.matrix_skills.belongsTo(models.matrix_sections, {
      foreignKey: 'id',
    });
    models.matrix_skills.hasMany(models.user_matrix_skills, {
      foreignKey: 'matrix_skill_id',
    });
  };

  return MatrixSkill;
};
