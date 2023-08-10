const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const otherUser=require('./service/otherUser')
const catchAsync=require('./utils/catchAsync');


const prisma = new PrismaClient();

const upload = multer({ storage:storage })


router.get('/getuser',isAuth.isAuth,catchAsync(otherUser.getUser))


  router.get('/personelusers/:id',isAuth.isAuth,catchAsync(otherUser.personelUserId))



















module.exports = router;