const db = require('../db/models/index');
const {
  sendNotificationForSubscribedAndChannel,
} = require('../sockets/notify');

const getMessagesById = async (id) => {
  try {
    const options = {
      where: {
        candidate_id: id,
      },
      attributes: { exclude: ['updatedAt'] },
      order: [['createdAt', 'ASC']],
    };

    const messages = await db.message.findAll(options);

    if (!messages) {
      throw new Error(`no messages found in db for candidate ${id}`);
    }
    return messages;
  } catch (error) {
    console.error(`Error in getMessagesByID method: ${error}`);
  }
};

const getReadStatusesByRelated = async (id, type) => {
  try {
    const options = {
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: db.message,
          attributes: ['candidate_id'],
          where: {
            candidate_id: id,
          },
        },
      ],
      order: [['createdAt', 'ASC']],
    };

    const messageUser = await db.messages_user.findAll(options);

    if (!messageUser) {
      throw new Error(`no messages found in db for ${type} ${id}`);
    }

    return messageUser;
  } catch (error) {
    console.error(`Error in getReadStatusesByTask method: ${error}`);
  }
};

const putNewMessage = async ({
  candidate_id,
  author_id,
  message,
  files,
  createdAt,
  updatedAt,

}) => {
  try {
    const messageData = {
      message,
      author_id,
      candidate_id,
      files: files || [],
      createdAt,
      updatedAt,
    };

    const newMessage = await db.message.create(messageData);

    if (!newMessage) {
      throw new Error('no message created');
    }

    const user = await db.user.findByPk(author_id);
    if (!user) {
      throw new Error(
        newMessage,
        `error find user for association author_id ${author_id}`,
      );
    }

    // if (directNotify.length > 0) {
    //   checkNotificationsInMessage(
    //     newMessage.message,
    //     directNotify,
    //     user,
    //     related_id,
    //   );
    // }

    // const associations = await newMessage.addSubscriber(user, {
    //   through: {
    //     readed_date: Date.now(),
    //   },
    // });
    // if (!associations) {
    //   throw new PossibleContinueError(
    //     newMessage,
    //     `error create associations to user_id ${author_id}`,
    //   );
    // }

    sendNotificationForSubscribedAndChannel(newMessage, author_id);

    return newMessage;
    // association: associations[0],
  } catch (error) {
    return {
      message: error.response,
    };
  }
};

// const putReadedStatus = async ({ idMessage, idUser, date, type }) => {
//   try {
//     const options = {
//       attributes: { exclude: ['updatedAt'] },
//       include: [
//         {
//           model: db.user,
//           as: 'subscribers',
//           attributes: ['id'],
//           where: {
//             id: idUser,
//             type,
//           },
//         },
//       ],
//     };

//     let message = await db.message.findByPk(idMessage, options);
//     if (!message) {
//       delete options.include[0].where;

//       message = await db.message.findByPk(idMessage, options);

//       if (!message) {
//         throw new Error(`no message found by id ${idMessage}`);
//       }

//       const user = await db.user.findByPk(idUser);

//       if (!user) {
//         throw new Error(`error find user user_id ${idUser}`);
//       }

//       const association = await message.addSubscribers(user, {
//         through: {
//           readed_date: date,
//         },
//       });

//       if (!association) {
//         throw new Error(`error create association to user_id ${idUser}`);
//       }
//       // ----------- ??? ------------
//       return {
//         task: message.related_id,
//         result: association[0],
//       };
//     }
//     const association = await message.subscribers[0].messages_user.update({
//       readed_date: date,
//     });

//     if (!association) {
//       throw new Error(
//         `error update association to user_id ${idUser} in message id=${idMessage}`,
//       );
//     }

//     return {
//       task: message.crm_tasks_id,
//       result: [association],
//     };
//   } catch (error) {
//     console.error(`Error in putReadedStatus method: ${error}`);
//   }
// };

// const getCountUnreadMessages = async (id, type, user) => {
//   try {
//     let options = {
//       where: {
//         related_id: id,
//         type,
//       },
//     };
//     const messageTotal = await db.message.count(options);

//     options = {
//       ...options,
//       attributes: { exclude: ['updatedAt'] },
//       include: [
//         {
//           model: db.messages_user,
//           as: 'message_user_info',
//           attributes: ['id', 'user_id', 'readed_date'],
//           where: {
//             user_id: user,
//             readed_date: { [db.Sequelize.Op.ne]: null },
//           },
//         },
//       ],
//     };
//     const message = await db.message.findAll(options);

//     return {
//       type,
//       id,
//       unreadCount: messageTotal - message.length,
//       messageTotal,
//     };
//   } catch (error) {
//     console.error(`Error in getCountUnreadMessages method: ${error}`);
//   }
// };

module.exports = {
  getMessagesById,
  putNewMessage,
  // getCountUnreadMessages,
  getReadStatusesByRelated,
  // putReadedStatus,
};
