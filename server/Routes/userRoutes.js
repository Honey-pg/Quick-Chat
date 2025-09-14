const express=require('express')
const { checkauth, updateUserProfile } = require('../controllers/userController')
const { protectRoute } = require('../middlewares/auth')
const { signup, login , logout } = require('../controllers/userController')
const userRouter=express.Router()

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.put('/update-profile',protectRoute,updateUserProfile);
userRouter.get('/check',protectRoute,checkauth);
userRouter.post('/logout', protectRoute, logout);


module.exports=userRouter;