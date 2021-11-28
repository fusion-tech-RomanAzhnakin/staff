const controller = require('../controllers/project');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');

const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/project');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'hr']));

  router.post('/', validationMiddlewhare(validator.create), controller.create);
  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
  router.delete('/', controller.deleteProject);
  router.put('/', validationMiddlewhare(validator.create), controller.edit);
  router.get('/tech', controller.getTech);
};
