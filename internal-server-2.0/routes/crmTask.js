const controller = require('../controllers/crmTask');
const isAuth = require('../middlewares/isAuth');
const forRoles = require('../middlewares/forRoles');

module.exports = (router) => {
  router.use(isAuth);

  router.get('/', forRoles(['admin', 'sales']), controller.getList);
};
