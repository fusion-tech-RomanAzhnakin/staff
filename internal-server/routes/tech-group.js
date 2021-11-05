const controller = require('../controllers/techGroup');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', controller.getTechGroup);
  router.post('/', isAllowedFor(['admin', 'sales', 'manager']), controller.postTechGroup);
  router.put('/:id', isAllowedFor(['admin', 'sales', 'manager']), controller.putTechGroup);
  router.delete('/:id', isAllowedFor(['admin', 'sales', 'manager']), controller.deleteTechGroup);
};
