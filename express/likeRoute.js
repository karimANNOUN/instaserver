const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const like=require('./service/like')
const catchAsync=require('./utils/catchAsync');
const prisma = new PrismaClient();

const upload = multer({ storage:storage })




router.post('/likes',isAuth.isAuth,catchAsync(like.like))
   

    router.delete('/deletelike',isAuth.isAuth,catchAsync(like.deleteLike))



    router.get('/likenumber',isAuth.isAuth,catchAsync(like.likeNumber))





















module.exports = router;