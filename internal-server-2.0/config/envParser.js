const dotenv = require('dotenv');
const changeCase = require('change-case');
const { normalize } = require('path');

const envParser = () => {
  const { parsed: rawEnv } = dotenv.config({ path: normalize(`${__dirname}/../.env`) });

  if (!rawEnv) { return {}; }

  let envConfig = {};

  Object.keys(rawEnv).forEach((key) => {
    const levels = key.split('__').map((i) => changeCase.camelCase(i));

    envConfig = handleEnvKey(envConfig, levels, parseEnvValue(rawEnv[key]));
  });

  return envConfig;
};

const handleEnvKey = (obj, levels, value) => {
  if (levels.length === 1) {
    return {
      ...obj,
      [levels[0]]: value,
    };
  }

  return {
    ...obj,
    [levels[0]]: handleEnvKey(obj[levels[0]] || {}, levels.slice(1), value),
  };
};

const parseEnvValue = (value) => {
  if (/^[0-9]*$/.test(value)) {
    return +value;
  }

  if (['true', 'false'].includes(value)) {
    return value === 'true';
  }

  return value;
};

module.exports = envParser;
