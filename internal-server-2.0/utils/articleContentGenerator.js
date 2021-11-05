const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

const logger = require('./logger');
const {
  createError,
  createValidationErrorBody,
} = require('./createError');
const config = require('../config');
const defaultConfig = require('../config/defaultConfig.json');

// eslint-disable-next-line max-len
const isDefaultApiKey = config.linkpreview.linkPreviewApiKey === defaultConfig.linkpreview.linkPreviewApiKey;
const apiKeyMissingMessage = 'There is no api key to get the content of the article';

if (isDefaultApiKey) {
  logger.warn(apiKeyMissingMessage);
}

module.exports = async (link) => {
  try {
    if (isDefaultApiKey) {
      throw createError(apiKeyMissingMessage, {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    const { data: linkContent } = await axios.get(config.linkpreview.linkPreviewUrl, {
      params: {
        key: config.linkpreview.linkPreviewApiKey,
        q: link,
      },
    });

    const { description } = linkContent;

    if (description.length >= 166) {
      const lastDescriptionChar = description[description.length - 1];
      let endOfFormattedString = '...';

      if (['.', '!', '?'].includes(lastDescriptionChar) && description.length === 166) {
        endOfFormattedString = lastDescriptionChar;
      }

      linkContent.description = `${description.slice(0, 166)}${endOfFormattedString}`;
    }

    return linkContent;
  } catch (err) {
    if (err.isAxiosError) {
      if ([StatusCodes.LOCKED, StatusCodes.BAD_REQUEST, 425].includes(err.response.status)) {
        throw createError(createValidationErrorBody([
          { path: 'link', message: 'Failed to get link content' },
        ]));
      } else if (err.response.status === StatusCodes.FORBIDDEN) {
        throw createError('Invalid API access key', { code: StatusCodes.FORBIDDEN });
      }

      throw err;
    }

    throw err;
  }
};
