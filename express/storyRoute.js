const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const story=require('./service/story')
const catchAsync=require('./utils/catchAsync');


const prisma = new PrismaClient();

const upload = multer({ storage:storage })

router.post('/createstories',isAuth.isAuth, upload.single('file'),catchAsync(story.creatStory))
  
   router.get('/allstories',isAuth.isAuth,catchAsync(story.allStories))


   router.get('/getstory/:id/:storiesId',isAuth.isAuth,catchAsync(story.getStoryIdStoryId))



   router.get('/storiesuser',isAuth.isAuth,catchAsync(story.storiesUser))
  
   router.get('/storiesuser/:storyId',isAuth.isAuth,catchAsync(story.storiesUserId))



   router.delete('/deletestories',isAuth.isAuth,catchAsync(story.deleteStoris))
  
  
  router.get('/storieuser/:storyuserId',isAuth.isAuth,catchAsync(story.storieuserStoryuserId))













module.exports = router;