import io from 'socket.io-client';
import tokenUtil from 'utils/token';

class SocketClass {
  constructor(url, room) {
    const token = tokenUtil.access.get();
    this.room = `chatroom-${room}`;
    this.socket = io(url, {
      query: { token },
    });
  }

  joinToRoom() {
    this.socket.emit('joinRoom', this.room);
  }

  emit(type, data) {
    this.socket.emit(type, { message: data, roomName: this.room });
  }

  on(type, callback) {
    this.socket.on(type, callback);
  }

  leaveRoom() {
    this.socket.emit('leaveRoom', this.room);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
export default SocketClass;
