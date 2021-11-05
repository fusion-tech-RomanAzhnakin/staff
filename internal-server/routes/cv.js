const controller = require('../controllers/cv');

const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);
  router.post('/', isAllowedFor(['admin', 'sales', 'manager']), controller.postCV);
};
