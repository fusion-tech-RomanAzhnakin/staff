const errorHandler = require('../utils/errorHandler');
const db = require('../db');

const checkDb = () => db.sequelize.authenticate().then(() => true).catch(() => false);

const healthCheck = async (req, res, next) => {
  try {
    const dbCheck = await checkDb();

    res.json({
      db: dbCheck,
    });
  } catch (err) {
    err.functionName = healthCheck.name;
    err.fileName = __filename;
    errorHandler(err, req, res, next);
  }
};

module.exports = (router) => {
  router.get('/', healthCheck);
};
