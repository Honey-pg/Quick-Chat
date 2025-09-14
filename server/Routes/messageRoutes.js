const express=require('express');
const { protectRoute } = require('../middlewares/auth');
const {getMessage,getUsersForSidebar,markMeassageAsSeen,sendMessage} = require('../controllers/messageController');

const messageRouter=express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar);
messageRouter.get('/:id', protectRoute, getMessage);
messageRouter.put('/mark/:id', markMeassageAsSeen);
messageRouter.post('/send/:id', protectRoute, sendMessage);

module.exports=messageRouter;