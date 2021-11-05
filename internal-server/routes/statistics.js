const controller = require('../controllers/statistics');
const isAuthorize = require('../middlewares/isAuthorize');
const isManagerOrOwnerOrHr = require('../middlewares/isManagerOrOwnerOrHr');

module.exports = (router) => {
  router.get('/holiday/:id', isAuthorize, isManagerOrOwnerOrHr, controller.getStatisticForUserHoliday);
  router.get('/:id', isAuthorize, isManagerOrOwnerOrHr, controller.getStatisticsForUser);
};
