import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST"],
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: "*", // Change this if needed
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
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

app.get('/', (req, res) => {
  res.send('Oi kire kire modhue')
})

server.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
