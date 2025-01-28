const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST"],
  },
});
app.get('/msg',(req,res)=>{
  console.log("adasdfasd")
  const msg = [{ text: "ggggggg", sender: "You" },{ text: "dddddddd", sender: "You" }]
  res.json(msg)
})
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (message) => {
    socket.to("dwPvyiMVRRIMEgPuAAAD").emit("receive_message", { text: message, sender: "User" });
  });
  console.log("hi")
  socket.on('delete_message', async (messageId) => {
        // const messages = await redisClient.lRange('messages', 0, -1);
        // const filteredMessages = messages.filter((msg) => JSON.parse(msg).id !== messageId);

        // // Save updated messages to Redis
        // await redisClient.del('messages');
        // filteredMessages.forEach((msg) => redisClient.rPush('messages', msg));
        console.log("fefef>>>>", messageId)
        io.emit('delete_message', messageId);
    });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
