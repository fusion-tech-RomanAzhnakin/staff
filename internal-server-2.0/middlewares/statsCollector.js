const errorHandler = require('../utils/errorHandler');
const logger = require('../utils/logger');

const plugValue = 'unknown';
const statsCollector = (req, res, next) => {
  try {
    const { app_id } = req.headers;

    const startStats = {
      protocol: req.protocol,
      domain: req.get('host'),
      route: req.originalUrl.replace(/\?.*/, ''),
      appId: app_id || plugValue,
      startTime: Date.now(),
      method: req.method,
    };

    req.stats = startStats;

    res.on('finish', () => {
      const endStats = req.stats;
      endStats.endTime = Date.now();

      console.log('\n'); // eslint-disable-line no-console
      logger.info(`App id -> ${endStats.appId};`);
      logger.subInfo(`Method -> ${endStats.method};`);
      logger.subInfo(`Route --> ${endStats.route};`);
      logger.subInfo(`Time ---> ${endStats.endTime - endStats.startTime}ms;`);

      // TO-DO: Add stats storing
    });

    next();
  } catch (err) {
    err.functionName = statsCollector.name;
    err.fileName = __filename;
    errorHandler(err, req, res, next);
  }
};

module.exports = statsCollector;
