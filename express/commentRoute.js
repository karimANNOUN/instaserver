const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const comment=require('./service/comment')
const catchAsync=require('./utils/catchAsync');

const prisma = new PrismaClient();

const upload = multer({ storage:storage })


router.post('/createComment',isAuth.isAuth,catchAsync(comment.creatComment))


  router.get('/getcoments/:postsId',isAuth.isAuth,catchAsync(comment.getCommentsId))




  router.delete('/deletecomment',isAuth.isAuth,catchAsync(comment.deleteComment))









module.exports = router;