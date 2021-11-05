const { WebClient } = require('@slack/web-api');
const logger = require('../utils/logger');
const config = require('../config');
const defaultConfig = require('../config/defaultConfig');

const isSlackBotActive =
  config.slackBot.slackToken === defaultConfig.slackBot.slackToken;

class SlackBot {
  constructor() {
    this.botname = config.slackBot.slackbotUsername;

    try {
      this.webClient = new WebClient(config.slackBot.slackToken);

      logger.info(`Slack is running as ${this.botname}`);
    } catch (err) {
      logger.error('Slack web-api error', err);
      this.botname = null;
      this.webClient = null;
    }
    if (isSlackBotActive) {
      logger.warn('SlackBot token is not provided');
      logger.warn('Warning! Slack Bot is running without connection to channel');
    }
  }

  async sendToChat(data, recipientRole = 'user') {
    const params = {
      type: 'message',
      as_user: false,
      username: this.botname,
      icon_url: config.siteAddress + config.slackBotIconPath,
      ...data,
    };
    try {
      let result;
      if (this.webClient && (recipientRole !== 'student')) {
        result = await this.webClient.chat.postMessage(params);
      }

      return result;
    } catch (err) {
      logger.error(`${this.botname}:channel ${data.channel} sendToChat error ${err.message}`);
      if (isSlackBotActive && err.data.error === 'invalid_auth') {
        logger.warn('Parametrs for sending message: \n', params);
      }
      return null;
    }
  }
}

const slackBot = new SlackBot();

module.exports = {
  slackBot,
};
