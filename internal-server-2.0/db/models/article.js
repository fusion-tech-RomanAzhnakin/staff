const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class article extends Model {
    static associate(models) {
      models.article.belongsTo(models.user, {
        foreignKey: 'added_by',
      });
      models.article.belongsToMany(models.tag, {
        through: {
          model: models.article_tag,
          as: 'tags',
          unique: false,
        },
        foreignKey: 'article_id',
      });
    }
  }
  article.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};
