const express = require('express');
require("dotenv").config();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bryptjs = require('bcryptjs');
const { connectDB } = require('./config/db');
const userRouter = require('./Routes/userRoutes');
const messageRouter = require("./Routes/messageRoutes");
const app = express();
const {Server}=require("socket.io");
const server = http.createServer(app);

//intialize socket io
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// export io so you can use it in other files if needed
exports.io = io;

// store online users in-memory and export the reference
const userSocketMap = {};
exports.userSocketMap = userSocketMap;

io.on("connection", (socket) => {
  // when a client connects to the server
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  console.log(`User ${userId} connected with socket ID ${socket.id}`);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // when a client disconnects from the server
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middleware
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: '4mb'}))
app.use(cors(
    {
        origin:"*",
        credentials:true,
    }
));


//routes
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

app.get("/",(req,res)=>{
    res.send("Server is running")
});

//connect to database
 connectDB();

const PORT = process.env.PORT || 3000;

// IMPORTANT: start the HTTP server instance so Socket.IO works correctly
server.listen(PORT, () => {
  console.log(`Server and Socket.IO running on port ${PORT}`);
});



