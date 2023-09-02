const express = require('express');
const router = express.Router();
const passport = require('passport');

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const {storage}= require('./uploads/cloudinary')
const  isAuth  = require('./utils/passport');
const catchAsync=require('./utils/catchAsync');
const authControllers=require('./service/auth')

const prisma = new PrismaClient();





router.get('/login/failed',authControllers.loginFaild);

router.get('/login/success',authControllers.loginSuccess);

router.post('/register', catchAsync(authControllers.registerPost));

router.post('/login', passport.authenticate('local'), catchAsync(authControllers.loginPost));


router.get('/user',catchAsync(authControllers.user));
 
 
 //router.post('/', isLogedIn,validateCampground, catchAsync(campgrounds.createCampground));

 
 //router.get('/:id',catchAsync(campgrounds.showCampground));

// router.get('/:id/edit',isLogedIn,isAuthor, catchAsync(campgrounds.renderEditForm));

 //router.put('/:id',isLogedIn,isAuthor,validateCampground, catchAsync(campgrounds.updateCampground));
 

// router.delete('/:id',isLogedIn, catchAsync(campgrounds.deleteCampground));



module.exports = router;