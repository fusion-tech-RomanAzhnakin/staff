const controller = require('../controllers/candidate');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/candidate');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'hr']));

  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
  router.post('/', validationMiddlewhare(validator.create), controller.create);
  router.patch('/:id', validationMiddlewhare(validator.update), controller.update);
  router.delete('/:id', validationMiddlewhare(validator.deleteOne), controller.deleteOne);
};
