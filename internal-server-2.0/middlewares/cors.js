const cors = require('cors');

const config = require('../config');

module.exports = cors({
  origin: [
    config.urls.staff,
    config.urls.staffOld,
    config.urls.crm,
  ],
  credentials: true,
});
