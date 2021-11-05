import { envType, isDev } from 'config';

const consoleColors = {
  info: '\x1b[36m%s\x1b[0m',
  warn: '\x1b[33m%s\x1b[0m',
  error: '\x1b[31m%s\x1b[0m',
};

export default {
  info: (...args) => {
    if (!isDev) { return; }

    // eslint-disable-next-line no-console
    console.log(consoleColors.info, 'INFO:    ', ...args);
  },
  warn: (...args) => {
    if (!isDev) { return; }

    console.warn(consoleColors.warn, 'WARNING: ', ...args);
  },
  error: (...args) => {
    if (envType === 'test') { return; }

    console.error(consoleColors.error, 'ERROR:   ', ...args);
  },
};
