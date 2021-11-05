const controller = require('../controllers/event');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', controller.getEvents);
  router.get('/:id', controller.getEvent);
  router.put('/:id', controller.putEvent);
  router.post('/', controller.postEvent);
  router.delete('/:id', isAllowedFor(['admin']), controller.deleteEvent);
};
