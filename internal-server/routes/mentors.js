const controller = require('../controllers/mentors');
const isAuthorize = require('../middlewares/isAuthorize');
const isAdminOrMentor = require('../middlewares/isAdminOrMentor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', isAdminOrMentor, controller.getMentors);
  router.post('/', isAdminOrMentor, controller.updateMentor);
};
