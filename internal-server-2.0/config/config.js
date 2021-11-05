const _defaultsDeep = require('lodash/defaultsDeep');

const defaultConfig = require('./defaultConfig');
const envParser = require('./envParser');
const logger = require('../utils/logger');

const env = process.env.NODE_ENV || 'development';

let localConfig;
try {
  // eslint-disable-next-line global-require
  localConfig = require('./localConfig.json');

  console.log('\n\n'); // eslint-disable-line no-console
  logger.info(`Config loaded from the localConfig.json file for '${env}' environment`);
} catch (err) {
  localConfig = {};
  logger.warn('There is no config/localConfig.json file');
}

const envConfig = envParser();

if (Object.keys(envConfig).length) {
  logger.info('Config loaded from the .env file');
}

const config = _defaultsDeep(envConfig, localConfig, defaultConfig);

module.exports = config;
