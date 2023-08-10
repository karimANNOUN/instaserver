
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





module.exports.notifications= async (req,res)=>{
    const notification = await prisma.Notification.findMany({
        where :{authorreceptionId:req.user.id},
         include: {
          author:true,
          posts:true 
         }
            })
            
            res.json(notification)  
 };