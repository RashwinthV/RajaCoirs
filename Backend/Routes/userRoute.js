const express=require('express');
const authMiddleware = require('../Middlewares/Authmiddlewares');
const { getProfile, updateProfile } = require('../Controller/profileController');
const router=express.Router()

router.get('/profile/:email',authMiddleware,getProfile)
router.put('/Update-profile',authMiddleware,updateProfile)
module.exports=router