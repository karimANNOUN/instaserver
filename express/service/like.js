const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





module.exports.like= async (req,res)=>{
    const likeInfo= req.body
    const likes= await prisma.Like.createMany({
     data:{
       authorId :likeInfo.user.id,
       postId:likeInfo.postId,
     }
    })
   if (req.user.id !== req.body.postAuthId ) {
     const creatNotificationComment= await prisma.Notification.create({
       data: {
       authorId : req.user.id ,
       postId : req.body.postId,
       authorreceptionId:req.body.postAuthId,
       isLiked : true,
       isComent : false,
       isFollow:false,
       }
     })  
   }
   
   
   const notification = await prisma.Notification.findMany({
     where :{authorreceptionId:req.user.id},
      include: {
       author:true,
       posts:true
      }
         })
     
   
    const personelId= req.body.postId
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
   
          const postJdid = await prisma.Post.findMany({
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
   
        
   
   
   // console.log(likesNumber)
    res.json({postJdid,user,notification})   
 };


 module.exports.deleteLike= async (req,res)=>{
    const delet = await prisma.Like.deleteMany({
        where: { 
          authorId: req.body.user.id,
          postId:req.body.postId
        }
      })
    
       const personelId= req.body.postId
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
    
           const postJdid = await prisma.Post.findMany({
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
    
         
     // console.log(likesNumber)
       res.json({postJdid,user})
 };

 module.exports.likeNumber= async (req,res)=>{
    const likesNumber=await prisma.like.findMany({
         
    }) 
    
    res.json(likesNumber)
 };