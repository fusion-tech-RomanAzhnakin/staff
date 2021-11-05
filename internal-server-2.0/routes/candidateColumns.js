const controller = require('../controllers/candidateСolumns');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/candidateColumns');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'hr']));

  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
};
