const controller = require('../controllers/request');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.post('/', controller.postRequest);
  router.put('/', controller.putRequest);
  router.get('/', isAllowedFor(['admin', 'sales', 'manager', 'hr', 'officeManager']), controller.getRequests);
  router.get('/:id', controller.getRequestsForUser);
  router.delete('/:id', isAllowedFor(['admin', 'officeManager']), controller.deleteRequest);
};
