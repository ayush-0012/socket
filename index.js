import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { measureMemory } from "node:vm";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
    // console.log("message", message);
  });
});

server.listen(8000, () => {
  console.log("server is running on port: 8000");
});
