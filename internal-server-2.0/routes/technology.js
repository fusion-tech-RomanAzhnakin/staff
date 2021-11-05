const controller = require('../controllers/technology');
const forRoles = require('../middlewares/forRoles');
const isAuth = require('../middlewares/isAuth');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/technology');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'hr', 'sales']));

  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
};
