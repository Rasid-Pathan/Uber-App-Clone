const socketIo = require("socket.io");
const userModel = require("./model/user.model");
const captainModel = require("./model/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connect", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`UserID: ${userId} UserType: ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if(!location || !location.ltd || !location.lng) {
        return socket.emit('error',{message:"Invalid Location Data."})
      }

      await captainModel.findByIdAndUpdate(userId, { location:{
        ltd: location.ltd,
        lng: location.lng
      } });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
    // console.log('called');
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
