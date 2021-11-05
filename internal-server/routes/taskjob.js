const controller = require('../controllers/taskJob');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', isAllowedFor(['admin', 'mentor']), controller.getTaskJobs);
  router.get('/:id', isAllowedFor(['admin', 'mentor']), controller.getTaskJob);
  router.put('/:id', isAllowedFor(['admin', 'mentor']), controller.putTaskJob);
  router.post('/', isAllowedFor(['admin', 'mentor']), controller.postTaskJob);
  router.delete('/:id', isAllowedFor(['admin', 'mentor']), controller.deleteTaskJob);
};
