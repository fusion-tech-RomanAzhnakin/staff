const { getUserName } = require('../utils');

const getName = (user) => {
  if (user.slack_conversational_id) {
    return `<@${user.slack_conversational_id}>`;
  }

  return getUserName(user);
};

module.exports = getName;
