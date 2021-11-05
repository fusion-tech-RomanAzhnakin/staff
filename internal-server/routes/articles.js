const controller = require('../controllers/articles');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', controller.getArticles);
  // router.get('/:id', controller.getArticle);
  router.post('/', controller.postArticle);
  router.delete('/:id', isAllowedFor(['admin']), isAuthorize, controller.deleteArticle);
};
