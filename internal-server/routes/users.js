const multer = require('multer');
const passwordCheck = require('../middlewares/passwordCheck');
const controller = require('../controllers/users');

const upload = multer({ dest: './public/uploads/' });
const uploadAvatar = multer();
const uniqueLogin = require('../middlewares/uniqueLogin');
const emailvalidation = require('../middlewares/emailValidation');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', controller.getUsers);
  router.get('/:login', controller.getUser);
  router.put('/editUser', upload.single('avatarIMG'), passwordCheck, uniqueLogin, emailvalidation, controller.editUser);
  router.put('/avatar/:id', uploadAvatar.single('avatarIMG'), controller.newAvatar);
  router.put('/adminChange/:id', isAllowedFor(['hr', 'admin']), controller.adminChange);
  router.delete('/:id', isAllowedFor(['admin']), controller.deleteUser);
};
