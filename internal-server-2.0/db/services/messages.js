const db = require('../models');
/**
 * @param {{
    id: number;
 * }} options
 */
const getList = async (id) => {
  const messages = await db.message.findAll(
    {
      where: { candidate_id: id },
      returning: true,
      // include: [
      //   {
      //     model: db.user,
      //     as: 'message_user_info',
      //   },
      // ],
    },
  );

  return messages;
};

module.exports = {
  getList,
};
