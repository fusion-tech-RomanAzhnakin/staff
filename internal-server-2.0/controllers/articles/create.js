const articlesService = require('../../db/services/article');
const articleContentGenerator = require('../../utils/articleContentGenerator');

const create = async (req, res, next) => {
  try {
    const { link, tags } = req.body;
    const linkContent = await articleContentGenerator(link);

    const {
      title,
      description,
      image,
    } = linkContent;

    const linkUrl = link.replace(/^https{0,1}:\/\/|\/.*$/g, '');
    const articleData = {
      title,
      description,
      image,
      url: linkUrl,
      link,
      added_by: req.user.id,
      tags,
    };
    const article = await articlesService.create(articleData);

    res.json(article);
  } catch (err) {
    if (err.type === 'custom') {
      return res.status(err.code).json(err.message);
    }

    err.functionName = create.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = create;
