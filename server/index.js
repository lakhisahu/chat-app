const { Socket } = require('socket.io');

const io = require('socket.io')(8000,{
  cors: {
    origin: '*',
  }
})

const users ={}
io.on('connection', (socket) => {
    socket.on('new-join', (name) => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('new-user',name)

      });
      socket.on("send",(message) => {
        socket.broadcast.emit("send-message",{message:message, name:users[socket.id]})
      })
      socket.on('disconnect', () => {
      
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]

      });
});
