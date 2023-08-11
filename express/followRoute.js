const express = require('express');
const router = express.Router();
const follow=require('./service/follow')

const { PrismaClient } = require('@prisma/client');

const  isAuth  = require('./utils/passport');
const catchAsync=require('./utils/catchAsync');

const prisma = new PrismaClient();


router.post('/followers',catchAsync(follow.followers))


  router.delete('/followersdelete',catchAsync(follow.deleteFollowers))


  router.get('/followuser',catchAsync(follow.followUser))

















module.exports = router;