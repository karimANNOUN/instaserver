const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const  isAuth  = require('../utils/passport');
const prisma = new PrismaClient();


module.exports.creatPosts= async (req,res)=>{
    const image = req.file;
    const authorId =req.user.id
   // const authId = parseInt(req.params.id)
   
     
   if (image == null) {
     
   }else{
     const post = await prisma.Post.createMany({
       data: {
         title:image.originalname,
         content:image.path,
         published: true,
         authorId : authorId,
   
       }
     }); 
   }
       
    // const { content } = req.file;
    const postJdid = await prisma.Post.findMany({
     include: {
       author: true,
       comment: {
         include: {
           author: true, // Fetches the related "comments" field within each post
         }}
  
     }, 
   });
     
   // const { content } = req.file;
  res.json(postJdid)
 };

 module.exports.allPosts= async (req,res)=>{
    const postJdid = await prisma.Post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
          comment: {
            include: {
              author: true, // Fetches the related "comments" field within each post
            }},
            like: {
              include: {
                author: true, // Fetches the related "comments" field within each post
              }},
    
        }, 
      });
        
      // const { content } = req.file;
     res.json(postJdid)
 };

 module.exports.deletePosts= async (req,res)=>{
    await prisma.Comment.deleteMany({ // Delete all comments related to the post
        where: {
          postId: req.body.postId
        } 
      })
  
     const post =   await prisma.Post.delete({  
        where: { 
          id: req.body.postId , 
    
        },  
      })
      
      const notifications=await prisma.Notification.deleteMany({  
        where: { 
          postId: req.body.postId , 
    
        },  
      })
  
      const postJdid = await prisma.Post.findMany({
        include: {
          author: true,
          comment: {
            include: {
              author: true, // Fetches the related "comments" field within each post
            }}
    
        }, 
      });
        
      // const { content } = req.file;
     res.json(postJdid)  
 };

 module.exports.postUser= async (req,res)=>{
    const post = await prisma.Post.findMany({ 
        where: { authorId: req.user.id }, 
        include: {
          author: true,
          comment: {    
            include: {
              author: true, // Fetches the related "comments" field within each post
            }}
          
        },
      })
       
      res.json(post)
 };

 module.exports.getPostId= async (req,res)=>{
    const postId= JSON.parse(req.params.postId)
    const user = await prisma.Post.findUnique({ 
      where: { id : postId },
      include: {
          author: true,
          comment: {
            include : {
              author: true,
            }
          },
          like:{
            include : {
              author: true,
            }
          }
        }})
 
  res.json(user)  
 };

 module.exports.profilPersonelId= async (req,res)=>{
    const personelId= JSON.parse(req.params.personelId)
    const user = await prisma.Post.findUnique({ 
      where: { id : personelId },
      include: {
          author: true,
          comment: {
            include : {
              author: true,
            },
          },
          like:{
            include:{
              author:true,
            }
          }
        }})
 
  res.json(user) 
 };