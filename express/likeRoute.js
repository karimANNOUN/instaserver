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




router.post('/likes',catchAsync(like.like))
   

    router.delete('/deletelike',catchAsync(like.deleteLike))



    router.get('/likenumber',catchAsync(like.likeNumber))





















module.exports = router;