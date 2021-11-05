const controller = require('../controllers/auth');
const validator = require('../validator/validationSchemas/auth');
const validationMiddleware = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

module.exports = (router) => {
  router.post('/sign-up', validationMiddleware(validator.signUp), controller.signUp);
  router.post('/sign-in', controller.signIn);
  router.get('/me', isAuth, controller.me);
  router.post('/refresh', controller.refresh);
};
