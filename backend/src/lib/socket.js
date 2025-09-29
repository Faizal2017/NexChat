import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Allow connections from both development and production URLs
    origin: (origin, callback) => {
      // Accept all origins for now to handle localhost and production deployment
      callback(null, true);
      // For more security, you could use: ["http://localhost:5173", "https://your-prod-domain.com"]
    },
    credentials: true,
  },
});

// this returns the socketid of the receiver
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

// listens for connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // store the userId and socketId in map when a user connects
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // typing indicator relay
  socket.on("typing", ({ receiverId, isTyping }) => {
    try {
      if (!receiverId) return;
      const senderId = userId;
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", { senderId, isTyping });
      }
    } catch (e) {
      console.error("typing relay error", e);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
