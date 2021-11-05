const socket = require('socket.io');

const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

process.on('unhandledRejection', (reason, p) => {
  logger.error('🚧 UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧', reason, p);
});

const server = app.listen(config.port, (err) => {
  if (err) {
    return logger.error('Error starting the server: ', err);
  }

  // eslint-disable-next-line no-console
  console.log(`
  /===============================\\
 |   Server is listening on ${config.port}   |
  \\===============================/
  `);
});
const io = socket(server,
  {
    pingTimeout: 60000,
    cors: {
      origin: '*',
    },
  });
require('./sockets/route.js')(io);
