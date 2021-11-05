const controller = require('../controllers/documents');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/documents');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'sales']));

  router.post('/portfolio', validationMiddlewhare(validator.portfolio), controller.createPortfolio);
};
