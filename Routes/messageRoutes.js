const express=require('express');
const { protectRoute } = require('../middlewares/auth');
const { getMessage, getUsersForSidebar , markMeassageAsSeen } = require('../controllers/messageController');

const messageRouter=express.Router();

messageRouter.get('/:id',protectRoute,getMessage);
messageRouter.get('/users',protectRoute,getUsersForSidebar);
messageRouter.put('/mark/:id',markMeassageAsSeen);


module.exports=messageRouter;