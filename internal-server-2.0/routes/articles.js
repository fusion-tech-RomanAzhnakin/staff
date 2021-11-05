const controller = require('../controllers/articles');
const isAuth = require('../middlewares/isAuth');
const validationMiddleware = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/articles');

module.exports = (router) => {
  router.use(isAuth);

  router.get('/', validationMiddleware(validator.getList), controller.getList);
  router.get('/filtered', validationMiddleware(validator.getFilteredIdList), controller.getFilteredIdList);
  router.post('/', validationMiddleware(validator.create), controller.create);
  router.delete('/:id', validationMiddleware(validator.deleteOne), controller.deleteOne);
};
