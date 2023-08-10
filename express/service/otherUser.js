
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports.getUser= async (req,res)=>{
    const user = await prisma.User.findMany({ 
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
      res.json({user})  
 };

 module.exports.personelUserId= async (req,res)=>{
    const userId= JSON.parse(req.params.id)
    const user = await prisma.User.findUnique({ 
      where: { id : userId },
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