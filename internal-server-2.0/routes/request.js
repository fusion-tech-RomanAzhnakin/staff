const controller = require('../controllers/request');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/request');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'sales', 'manager', 'hr']));

  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
  router.post('/', validationMiddlewhare(validator.create), controller.create);
  router.put('/', controller.edit);
};
