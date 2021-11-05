module.exports = (sequelize, Sequelize) => {
  const MatrixSection = sequelize.define('matrix_sections', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
  }, {
    paranoid: true,
  });

  MatrixSection.associate = (models) => {
    models.matrix_sections.belongsTo(models.matrix_groups, {
      foreignKey: 'id',
    });
    models.matrix_sections.hasMany(models.matrix_skills, {
      foreignKey: 'section_id',
    });
  };

  return MatrixSection;
};
