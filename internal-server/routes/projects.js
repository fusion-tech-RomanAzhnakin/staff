const multer = require('multer');
const controller = require('../controllers/projects');

const upload = multer({ dest: './public/uploads/projects' });
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get(
    '/',
    isAllowedFor(['admin', 'sales', 'manager']),
    controller.getProjects
  );
  router.get(
    '/project/:id',
    controller.getProject
  );
  router.get(
    '/:id',
    controller.getProjectForUser
  );
  router.put(
    '/:id',
    isAllowedFor(['admin', 'sales', 'manager']),
    upload.array('projectIMG', 5),
    controller.putProjects
  );
  router.post(
    '/',
    isAllowedFor(['admin', 'sales', 'manager']),
    upload.array('projectIMG', 5),
    controller.postProjects
  );
  router.delete(
    '/:id',
    isAllowedFor(['admin', 'sales', 'manager']),
    controller.deleteProject
  );
};
