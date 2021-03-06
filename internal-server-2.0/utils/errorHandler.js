/* eslint-disable no-console */
const { formatToTimeZone } = require('date-fns-timezone');
const { StatusCodes } = require('http-status-codes');

const logger = require('./logger');
const config = require('../config');
const { getFileName } = require('./helpers');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.message === 'Validation error') {
    return res.status(400).json(err.errors[0].message);
  }

  const data = {
    functionName: err.functionName,
    absolutePath: err.fileName,
    fileName: getFileName(err.fileName),
    stack: err.stack,
    error: err,
  };

  const timeStamp = formatToTimeZone(
    new Date(),
    'DD.MM.YYYY HH:mm:ss',
    { timeZone: config.timezone },
  );

  console.log('\n');
  logger.error('------------------ Error START ------------------');
  logger.subError('Time stamp: ', `${timeStamp} (${config.timezone})`);
  logger.subError('Absolute file path: ', data.absolutePath);
  logger.subError('File name: ', data.fileName);
  logger.subError('Function name: ', data.functionName);
  logger.subError('Stack: ', data.stack);
  logger.subError('Message: ', err.message);
  logger.error('------------------ Error END ------------------');
  console.log('\n');

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Internal server error 😢😢😢');
};
