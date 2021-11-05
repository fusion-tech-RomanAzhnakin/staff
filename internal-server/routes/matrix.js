const controller = require('../controllers/matrix');
const isAuthorize = require('../middlewares/isAuthorize');
const isAdmin = require('../middlewares/isAdmin');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/groups', controller.getGroups);
  router.post('/groups', isAdmin, controller.postGroup);
  router.put('/groups/:id', isAdmin, controller.editGroup);
  router.delete('/groups/:id', isAdmin, controller.deleteGroup);

  router.get('/sections', controller.getSections);
  router.post('/sections', isAdmin, controller.postSection);
  router.put('/sections/:id', isAdmin, controller.editSection);
  router.delete('/sections/:id', isAdmin, controller.deleteSection);

  router.get('/skills', controller.getSkills);
  router.post('/skills', isAdmin, controller.postSkill);
  router.put('/skills/:id', isAdmin, controller.editSkill);
  router.delete('/skills/:id', isAdmin, controller.deleteSkill);

  router.get('/user-skills/:id', controller.getUserSkills);
  router.post('/user-skills', isAdmin, controller.postUserSkill);
  router.put('/user-skills/self/:skillId', controller.selfEstimate);
  router.put('/user-skills/:id', isAdmin, controller.editUserSkill);
  router.delete('/user-skills/:id', isAdmin, controller.deleteUserSkill);

  router.get('/user-skill-comments/:id', controller.getMatrixSkillComments);
  router.post('/user-skill-comments', isAdmin, controller.postMatrixSkillComment);
  router.put('/user-skill-comments/:id', isAdmin, controller.editMatrixSkillComment);
  router.delete('/user-skill-comments/:id', isAdmin, controller.deleteMatrixSkillComment);
};
