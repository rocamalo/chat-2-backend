//ruta /api/users
const { Router } = require("express");


const router = Router();

// //socket IO FUNCTIONALITY TODO move it somewhere else
// let users = [];
// let rooms = ['room1', 'room2', 'room3', 'room4'];

// io.on('connection', (socket) => {
//   console.log(`User with id ${socket.id} has connected!`);
//   users.push(socket.id);
//   io.emit('users', users);

//   socket.on('message', (message) => {
//     console.log(message);
//     if (message !== null) {
//       io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
//     }
//   });

//   socket.on('privatemsg', ({socketId, msg}) => {
//     if (msg !== null) {
//       console.log(`Message: ${msg} to ${socketId}`);
//       io.to(socketId).emit('privatemsg', `user says ${msg}`);
//     }
    
//   });

//   //CHAT ROOMS
//   socket.on('joinroom', (roomName) => {
//       console.log(`User ${socket.id} joining room ${roomName}`);
//       socket.join(roomName);
//       //TODO BROADCAST SOMEONE ENTERED THE CHANNEL
//   });

//   socket.on('leaveroom', (roomName) => {
//     console.log(`User ${socket.id} leaving room ${roomName}`);
//     socket.leave(roomName);
//   });

//   socket.on('messageroom', ({roomName, messageroom}) => {
//     console.log(`User ${socket.id} says ${messageroom} to room ${roomName}`);
//     io.to(roomName).emit('msgroom', `User ${socket.id} says ${messageroom} `)
//   });

//   socket.on('rooms', () => {
//       io.emit('rooms', rooms);
//   });

//   socket.on('createroom', (roomName) => {
//     rooms.push(roomName);
//     io.emit('rooms', rooms);
// });


//   socket.on('disconnect', () => {
//     console.log('a user disconnected!' + socket.id);

//     users =  users.filter( u =>  u !== socket.id);
//     console.log(users);
//     io.emit('users', users);
//   });
// });

module.exports = router;
