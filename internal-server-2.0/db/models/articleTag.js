const {
  Model,
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class articleTag extends Model {
    static associate() {
    }
  }
  articleTag.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_id: {
      type: Sequelize.INTEGER,
    },
    article_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'article_tag',
  });
  return articleTag;
};
