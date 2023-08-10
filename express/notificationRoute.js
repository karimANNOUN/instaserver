const express = require('express');
const router = express.Router();
const notification=require('./service/notification')

const { PrismaClient } = require('@prisma/client');

const  isAuth  = require('./utils/passport');
const catchAsync=require('./utils/catchAsync');

const prisma = new PrismaClient();

router.get('/notifications',isAuth.isAuth,catchAsync(notification.notifications))



  module.exports = router;