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

const server = http.createServer(app);

//middleware
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: '4mb'}))
app.use(cors());

app.use("/",(req,res)=>{
    res.send("Server is running")
});

//routes
app.use("/api/v1",userRouter);
app.use("/api/messages",messageRouter);

//connect to database
 connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});



