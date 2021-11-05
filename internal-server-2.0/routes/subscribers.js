const controller = require('../controllers/candidateSubscribers');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');
// const validationMiddlewhare = require('../middlewares/validator');
// const validator = require('../validator/validationSchemas/candidate');

module.exports = (router) => {
  router.use(isAuth);
  router.use(forRoles(['admin', 'hr']));

  router.patch('/:id', controller.update);
};
