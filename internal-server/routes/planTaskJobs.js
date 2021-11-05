const controller = require('../controllers/planTaskJobs');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/getTimeFrames', isAllowedFor(['admin']), controller.getPlanTaskJobsTimeFrames);
};
