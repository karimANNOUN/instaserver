const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();






module.exports.followers= async (req,res)=>{
    const followers = await prisma.Followers.create({
        data: {
          authorId :req.body.allUser.id,
          followId:req.user.id,
          name:req.user.name ,
          avatar:req.user.imageUrl, 
          }
      })
      const following = await prisma.Following.create({
        data: { 
          authorId : req.user.id,
          followId: req.body.allUser.id,
          name:req.body.allUser.name,
          avatar:req.body.allUser.imageUrl
          }
      })   
    
      const creatNotificationComment= await prisma.Notification.create({
        data: {
        authorId : req.user.id ,
        authorreceptionId:req.body.allUser.id,
        isLiked : false,
        isComent : false, 
        isFollow:true,
        }
      })   
     
      const notification = await prisma.Notification.findMany({
        where :{authorreceptionId:req.user.id},
         include: {
          author:true,
          posts:true
    
         }
            })
    
           
    
      const user = await prisma.User.findUnique({ 
        where: { id : req.body.allUser.id },
        include: {
          posts: {
            include : {
            author: true,
            comment: {
              include : {
                author: true,
              }
            }
          }
          },
          profile: true,
          story:{
            include:{
              author:true
            }
          },
          followers:{
            include:{
              author:true
            }
          },
          following:{
            include:{author:true}
          }
          
        },
       })
    
    
    res.json({user,notification}) 
 };

 module.exports.deleteFollowers= async (req,res)=>{
    const followers = await prisma.Followers.deleteMany({         
        where:{
         AND : [
          { followId:{equals:req.user.id}} , 
           {authorId:{equals:req.body.allUser.id}}
         ]
         }
       })
       const following = await prisma.Following.deleteMany({
         where:{
           AND : [
             { followId:{equals:req.body.allUser.id}} , 
              {authorId:{equals:req.user.id}}
            ]
         }
       }) 
     
       const user = await prisma.User.findUnique({ 
         where: { id : req.body.allUser.id },
         include: {
           posts: {
             include : {
             author: true,
             comment: {
               include : {
                 author: true,
               }
             }
           }
           },
           profile: true,
           story:{
             include:{
               author:true
             }
           },
           followers:{
             include:{
               author:true
             }
           },
           following:{
             include:{author:true}
           }
           
         },
        })
     
     
     res.json(user) 
 };

 module.exports.followUser= async (req,res)=>{
    const following = await prisma.Following.findMany({
        where:{authorId:req.user.id}
    })
    const followers = await prisma.Followers.findMany({
      where:{authorId:req.user.id}
    })
   
  res.json({following,followers}) 
 };