const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class tag extends Model {
    static associate(models) {
      models.tag.belongsToMany(models.article, {
        through: {
          model: models.article_tag,
          unique: false,
        },
        foreignKey: 'tag_id',
      });
    }
  }
  tag.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.TEXT,
      notEmpty: true,
    },
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};
