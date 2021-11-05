const controller = require('../controllers/users');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');

module.exports = (router) => {
  router.use(isAuth);

  router.get('/', forRoles(['admin', 'sales', 'manager', 'hr']), controller.getList);
};
