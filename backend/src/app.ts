import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ A user connected");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    console.log(`📢 ${username} joined room: ${room}`);
  });

  socket.on("sendMessage", ({ text, sender, room }) => {
    io.to(room).emit("receiveMessage", { text, sender });
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

server.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
