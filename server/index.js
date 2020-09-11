const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let messages = [];

io.on("connection", (socket) => {
  socket.on("getMessage", (player) => {
    socket.broadcast.emit("getMessage", player);
    messages.push(player);
  });

  socket.on("sendMessage", (player) => {
      socket.broadcast.emit("sendMessage", player);
  });

  socket.emit("getMessages", messages);
});

server.listen(3000);
