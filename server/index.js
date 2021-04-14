const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const cors = require("cors");

const {
  addUser,
  editUser,
  removeUser,
  getUsersInRoom,
  getUser,
} = require("./users.js");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }) => {
    user = addUser({ id: socket.id, name, room });

    console.log(user);

    socket.join(room);

    io.to(room).emit("roomData", {
      room: room,
      users: getUsersInRoom(room),
    });

    socket.emit("message", {
      userId: "admin",
      name: "admin",
      text: `Hi ${name}! Welcome to room ${room}.`,
    });
    socket.broadcast.to(room).emit("message", {
      userId: "admin",
      name: "admin",
      text: `${name} has joined!`,
    });

    io.to(room).emit("roomData", {
      room,
      users: getUsersInRoom(room),
    });
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      userId: socket.id,
      name: user.name,
      text: message,
    });
  });

  socket.on("change name", (name) => {
    const oldUser = getUser(socket.id);
    const oldName = oldUser.name;

    const newUser = editUser(socket.id, name);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });

    socket.emit("message", {
      userId: "admin",
      name: "admin",
      text: `${oldName} has changed their name to ${name}.`,
    });
  });

  socket.on(
    "syncVideoOnJoin",
    (syncUserId, senderVidURL, senderTime, isSenderPlaying) => {
      const user = getUser(socket.id);
      if (user)
        socket.broadcast
          .to(syncUserId)
          .emit("syncOnJoin", senderVidURL, senderTime, isSenderPlaying);
    }
  );

  socket.on("seekVideo", (senderTime) => {
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast.to(user.room).emit("seek", senderTime);
    }
  });

  socket.on("loadVideo", (videoURL) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("load", videoURL);
  });

  socket.on("playVideo", (senderTime) => {
    const user = getUser(socket.id);
    if (user) socket.broadcast.to(user.room).emit("play", senderTime);
  });

  socket.on("pauseVideo", () => {
    const user = getUser(socket.id);
    if (user) socket.broadcast.to(user.room).emit("pause");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        userId: "admin",
        name: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}!`));
