const db = require('../models');

/**
 * @param {{
    id: number;
    {
     user_id: number;
    } data
 * }} options
 */
const update = async (id, data) => {
  const subscriber = await db.user_subscriptions.findOne(

    {
      where: { candidate_id: Number(id), ...data },
    },
  );
  if (!subscriber) {
    await db.user_subscriptions.create({ candidate_id: id, ...data });
  } else {
    await subscriber.destroy();
  }
};

module.exports = {
  update,
};
