const controller = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');
const validationMiddlewhare = require('../middlewares/validator');
const validator = require('../validator/validationSchemas/user');
const forRoles = require('../middlewares/forRoles');

module.exports = (router) => {
  router.use(isAuth);

  router.get('/', validationMiddlewhare(validator.getList), controller.getList);
  router.get('/:id', validationMiddlewhare(validator.getOne), controller.getOne);
  router.patch('/update/:id', validationMiddlewhare(validator.update), controller.update);
  router.patch('/change-password/:id', validationMiddlewhare(validator.changePassword), controller.changePassword);
  router.patch('/update-admin/:id', forRoles(['admin']), controller.updateUserFromAdmin);
};
