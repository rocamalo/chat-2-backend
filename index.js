const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


// Crear el servidor/aplicación de express
const app = express();

//socket io
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});


// Base de datos
dbConnection();


// Directorio Público
app.use( express.static('public') );

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


// Rutas

//auth
app.use( '/api/auth', require('./routes/auth') );

//Users
app.use( '/api/users', require('./routes/users') );

//Groups
app.use( '/api/groups', require('./routes/groups') );

// //sockets
app.use('socket.io', require('./routes/socket'));


//socket IO FUNCTIONALITY TODO move it somewhere else
let users = [];
let rooms = ['room1', 'room2', 'room3', 'room4'];

io.on('connection', (socket) => {
  console.log(`User with id ${socket.id} has connected!`);
  users.push(socket.id);
  io.emit('users', users);

  socket.on('message', (message) => {
    console.log(message);
    if (message !== null) {
      io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    }
  });

  socket.on('privatemsg', ({socketId, msg}) => {
    if (msg !== null) {
      console.log(`Message: ${msg} to ${socketId}`);
      io.to(socketId).emit('privatemsg', `user says ${msg}`);
    }
    
  });

  //CHAT ROOMS
  socket.on('joinroom', (roomName) => {
      console.log(`User ${socket.id} joining room ${roomName}`);
      socket.join(roomName);
      //TODO BROADCAST SOMEONE ENTERED THE CHANNEL
  });

  socket.on('leaveroom', (roomName) => {
    console.log(`User ${socket.id} leaving room ${roomName}`);
    socket.leave(roomName);
  });

  socket.on('messageroom', ({roomName, messageroom}) => {
    console.log(`User ${socket.id} says ${messageroom} to room ${roomName}`);
    io.to(roomName).emit('msgroom', `User ${socket.id} says ${messageroom} `)
  });

  socket.on('rooms', () => {
      io.emit('rooms', rooms);
  });

  socket.on('createroom', (roomName) => {
    rooms.push(roomName);
    io.emit('rooms', rooms);
});


  socket.on('disconnect', () => {
    console.log('a user disconnected!' + socket.id);

    users =  users.filter( u =>  u !== socket.id);
    console.log(users);
    io.emit('users', users);
  });
});

// app.listen( process.env.PORT, () => {
//     console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
// });

httpServer.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
  console.log(`Socket server listening on port ${process.env.PORT}`)
})

