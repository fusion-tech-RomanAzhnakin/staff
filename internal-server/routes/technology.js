const multer = require('multer');
const controller = require('../controllers/technology');
const isAuthorize = require('../middlewares/isAuthorize');
const isAllowedFor = require('../middlewares/isAllowedFor');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads/technology_icons/');
  },
  filename(req, file, cb) {
    const { title } = req.params;
    const filename = `ic_${title}.svg`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = (router) => {
  router.use(isAuthorize);

  router.get('/', controller.getTechnologies);
  router.get('/:id', controller.getTechnology);
  router.post('/', isAllowedFor(['admin', 'sales', 'manager']), controller.postTechnology);
  router.put('/:id', isAllowedFor(['admin', 'sales', 'manager']), controller.putTechnology);
  router.put('/image/:title', isAllowedFor(['admin', 'sales', 'manager']), upload.single('image'), controller.newTechnologyImage);
  router.delete('/:id', isAllowedFor(['admin', 'sales', 'manager']), controller.deleteTechnology);
};
