const socket = require('socket.io');
const socketioJwt = require("socketio-jwt");
const { JVT_SECRET } = process.env;

let io = null;
let clients = {};

function socketConnect(server) {
  io = socket(server);

  io.use(socketioJwt.authorize({
    secret: JVT_SECRET,
    handshake: true
  }));


  io.on('connection', (client) => {
    const { id } = client.decoded_token;
    if (!id) {
      client.emit('unauthorized');
      return;
    }
    clients[id] = client;
    io.emit('onlineUsers', Object.keys(clients));
    clients[id].on('video', (data) => {
        if(clients[data.to]) {
            clients[data.to].emit('stream', data.img)
        }
    });

    clients[id].on('disconnect', () => {
      delete clients[id];
      io.emit('onlineUsers', Object.keys(clients));
    });
  });

  return io;
}

module.exports = {
  socketConnect,
  io
}
