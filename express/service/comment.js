const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




module.exports.creatComment= async (req,res)=>{
    if(req.user){
        const creatComment= await prisma.Comment.create({
          data: {
          content : req.body.comments,
          authorId : req.user.id ,
          postId : req.body.postId ,
          }
        })
    
        if (req.user.id !== req.body.postAuthId ) {
          const creatNotificationComment= await prisma.Notification.create({
            data: {
            authorId : req.user.id ,
            postId : req.body.postId,
            authorreceptionId:req.body.postAuthId,
            isLiked : false,
            isComent : true,
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
              }
            },
            like: {
              include : {
                author: true,
              }}
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
    
    res.json({user,postJdid,notification})
      } 
 };


 module.exports.getCommentsId= async (req,res)=>{
    const postIds=JSON.parse(req.params.postsId)
    const getComments=await prisma.Comment.findMany({
       where:{postId:postIds},
      include: {
        author: true   
      }, 
    })
  
    //const personelId= req.body.postId
    const user = await prisma.Post.findUnique({  
      where: { id : postIds },
      include: {
          author: true,
          comment: {
            include : {
              author: true,  
            } 
          }
        }})
  
  
  
    res.json(user)   
 };



 module.exports.deleteComment= async (req,res)=>{
    await prisma.Comment.delete({ // Delete all comments related to the post
        where: {
          id: req.body.commentId
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
              }
            },
            like: {
              include : {
                author: true,
              }}
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
    
    res.json({postJdid,user})
 };


