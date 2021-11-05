const controller = require('../controllers/skills');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);
  router.get('/', isAllowedFor(['admin', 'sales', 'manager']), controller.getSkills);
};
