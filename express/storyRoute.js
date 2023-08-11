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

router.post('/createstories', upload.single('file'),catchAsync(story.creatStory))
  
   router.get('/allstories',catchAsync(story.allStories))


   router.get('/getstory/:id/:storiesId',catchAsync(story.getStoryIdStoryId))



   router.get('/storiesuser',catchAsync(story.storiesUser))
  
   router.get('/storiesuser/:storyId',catchAsync(story.storiesUserId))



   router.delete('/deletestories',catchAsync(story.deleteStoris))
  
  
  router.get('/storieuser/:storyuserId',catchAsync(story.storieuserStoryuserId))













module.exports = router;