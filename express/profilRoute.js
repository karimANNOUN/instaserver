const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const profil=require('./service/profil')
const catchAsync=require('./utils/catchAsync');

const prisma = new PrismaClient();

const upload = multer({ storage:storage })


router.post('/createImage',isAuth.isAuth ,upload.single('file'),catchAsync(profil.creatImage))



  router.post('/createBio',isAuth.isAuth,catchAsync(profil.createBio))
  router.get('/getbio',isAuth.isAuth,catchAsync(profil.getBio))









module.exports = router;