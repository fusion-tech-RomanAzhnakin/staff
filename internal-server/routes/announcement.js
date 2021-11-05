const multer = require('multer');
const controller = require('../controllers/announcement');
const config = require('../config');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

const upload = multer({ dest: './public/uploads/announcement' });

module.exports = (router) => {
  router.use(isAuthorize);
  router.get('/', controller.getAnnouncements);
  router.get('/:id', controller.getAnnouncement);
  router.post(
    '/',
    isAllowedFor(['admin', 'hr']),
    upload.array('adIMG', config.quantityPicture),
    controller.postAnnouncement
  );
  router.put(
    '/:id',
    isAllowedFor(['admin', 'hr']),
    upload.array('adIMG', config.quantityPicture),
    controller.putAnnouncement
  );
  router.delete(
    '/:id',
    isAllowedFor(['admin']),
    controller.deleteAnnouncement
  );
};
