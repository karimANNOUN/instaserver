const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const posts=require('./service/posts')
const catchAsync=require('./utils/catchAsync');

const prisma = new PrismaClient();

const upload = multer({ storage:storage })


  router.post('/createpost' ,upload.single('file'),catchAsync(posts.creatPosts));


   router.get('/allposts',catchAsync(posts.allPosts));


  router.delete('/deletepost',catchAsync(posts.deletePosts));


  router.get('/postuser',catchAsync(posts.postUser))



  router.get('/p/:postId',catchAsync(posts.getPostId))
  
   router.get('/profil/:personelId',catchAsync(posts.profilPersonelId))








   module.exports = router;