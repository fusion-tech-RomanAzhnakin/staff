const moment = require('moment');
const webpush = require('web-push');

moment.locale('ru');
const { slackBot } = require('../slackBot/index');
const db = require('../db/models');
const logger = require('../utils/logger');
const config = require('../config');

try {
  webpush.setVapidDetails(
    `mailto:${config.externalApi.vapidMail}`,
    config.externalApi.vapidPublicKey,
    config.externalApi.vapidPrivateKey,
  );
} catch (err) {
  logger.warn('Check this part later');
}
/**
 * Send notifications about new message for subscribed users
 * @param {*} message  : Message - db.message object
 * @param {*} idAuthor  : id of author of message
 */
async function sendNotificationForSubscribedAndChannel(message, idAuthor) {
  try {
    const candidate = await message.getCandidate();
    const author = await message.getAuthor();

    const users = await candidate.getSubscribers();
    const textMessage = `_Новое сообщение в чате кандидата, на которого Вы подписаны:_\n${message.message}`;

    for (const user of users) {
      if (user && user.id !== idAuthor) {
        slackCRMCandidateNotify(user, author, textMessage, candidate.id);
      }
    }
  } catch (error) {
    logger.error('sendNotificationForSubscribedAndChannel', error.message);
  }
}

function generateCandidateUrl(candidate) {
  if (!candidate || !candidate.id) {
    return '';
  }

  return `${config.urls.staff}/${'hr-boards'}?candidate=${candidate.id}`;
}

/**
 * Send slack notification to user (user need has slack_conversational_crm_id in db)
 * @param {*} user : db.user - user object of target
 * @param {*} userAuthor  : db.user - user object of author, may be undefined
 * @param {*} message : string - text message
 * @param {*} idCandidate : number - db.crm_tasks object of task, may be undefined
 */
async function slackCRMCandidateNotify(user, userAuthor, message, idCandidate) {
  if (!(user || user.slack_conversational_id || message)) {
    return;
  }

  let candidateName = '';
  let candidate;

  try {
    candidate = await db.candidate.findByPk(idCandidate);

    if (candidate) {
      candidateName = candidate.firstName;
    }
  } catch (error) {
    logger.error('slackCRMCandidateNotify', error.message);
  }

  const authorName = userAuthor
    ? `_Сообщение  от ${userAuthor.firstName} ${userAuthor.lastName}_:\n`
    : '';

  const textMessage = `:rocket: *<${generateCandidateUrl(candidate)}|Fusion CRM message in the page of candidate:>   \`${candidateName}\`*\n${authorName}${message}`;

  try {
    const data = {
      channel: user.slack_conversational_id,
      text: textMessage,
    };
    await slackBot.sendToChat(data);
  } catch (error) {
    logger.error('slackCRMCandidateNotify', error.message);
  }
}

module.exports = {
  sendNotificationForSubscribedAndChannel,
};
