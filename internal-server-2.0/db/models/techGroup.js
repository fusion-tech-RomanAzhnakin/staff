const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class techGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.techGroup.hasMany(models.technologies, {
        foreignKey: 'group_id',
      });
    }
  }
  techGroup.init(
    {
      title: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'techGroup',
    },
  );
  return techGroup;
};
