const controller = require('../controllers/plan');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/:id', controller.getPlan);
  router.post('/', isAllowedFor(['admin', 'mentor']), controller.postPlan);
  router.put('/:id', controller.putPlan);
  router.put('/taskJobInPlan/:id', controller.putTaskJobInPlan);
  router.delete('/:id', isAllowedFor(['admin', 'mentor']), controller.deletePlan);
};
