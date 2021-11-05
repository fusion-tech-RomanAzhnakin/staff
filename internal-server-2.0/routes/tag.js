const controller = require('../controllers/tag');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
const validationMiddleware = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/tag');

module.exports = (router) => {
  router.use(isAuth);

  router.get('/', validationMiddleware(validator.getAll), controller.getAll);
  router.get('/:id', validationMiddleware(validator.getOne), controller.getOne);
  router.post('/', validationMiddleware(validator.create), controller.create);
  router.patch('/:id', forRoles(['admin']), validationMiddleware(validator.update), controller.update);
  router.delete('/:id', forRoles(['admin']), validationMiddleware(validator.deleteOne), controller.deleteOne);
};
