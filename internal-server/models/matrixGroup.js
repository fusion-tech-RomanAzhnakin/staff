module.exports = (sequelize, Sequelize) => {
  const MatrixGroup = sequelize.define('matrix_groups', {
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

  MatrixGroup.associate = (models) => {
    models.matrix_groups.hasMany(models.matrix_sections, {
      foreignKey: 'group_id',
    });
  };

  return MatrixGroup;
};
