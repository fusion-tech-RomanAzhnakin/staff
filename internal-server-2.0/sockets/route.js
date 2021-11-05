/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');

const controllerUser = require('../controllers/user');
const controllerChat = require('../sockets_controllers/chat');

const config = require('../config');
const socketMessage = require('./socket-constant');

const connectRoute = (io) => {
  io.use((socket, next) => {
    const { token } = socket.handshake.query;
    if (!token) {
      next(new Error('401 No token found in request.'));
      return;
    }

    jwt.verify(token, config.token.secret, async (err, decoded) => {
      if (err || !decoded) {
        next(new Error('401 Failed to authenticate token.'));
        return;
      }
      socket.handshake.user = decoded;

      const req = {
        params: {
          id: socket.handshake.user.id,
        },
      };

      const res = {};
      res.send = (data) => {
        socket.handshake.role = data.role;
        socket.handshake.status = data.status;
        next();
      };
      await controllerUser.getOne(req, res, next);
    });
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
    });
    socket.on('destroy', (room) => {
      socket.leave(room);
    });

    socket.on(socketMessage.PUT_MESSAGE, async (data) => {
      if (!data) {
        return;
      }
      const result = await controllerChat.putNewMessage(data.message);

      if (result) {
        io.to(data.roomName).emit(socketMessage.GET_APPEND_MESSAGE_BY_ID,
          result);
      }
    });

    socket.on('leaveRoom', (roomName) => {
      socket.leave(roomName);
    });
  });
};

module.exports = connectRoute;
