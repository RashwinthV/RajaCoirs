const express=require('express');
const { Register, login } = require('../Controller/register');
const router=express.Router()

router.post('/signup',Register)
router.post('/login',login)

module.exports=router