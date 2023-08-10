const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.creatImage= async (req,res)=>{
    const image = req.file;
    
    const imgUrl =req.user.imageUrl
   // const authId = parseInt(req.params.id)
    
     
   if(imgUrl== ""){
    const creatImage = await prisma.User.create({
      data: {
       imageUrl: image.path
  
      }
    });  
   }else{
    const updateImage = await prisma.User.update({
      where: { id: req.user.id },
      data: { imageUrl: image.path},
   }
      
    // const { content } = req.file;
   
   )}
  
   const user = await prisma.User.findUnique({ 
    where: { id : req.user.id },
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


 module.exports.createBio= async (req,res)=>{
    const Bio = req.body;
  
 
    const bio = await prisma.Profile.findUnique({
      where: { userId: req.user.id },
    })



if( bio === null){
  const creatBio = await prisma.Profile.create({
    data: { 
      bio : Bio.bio ,
      userId : req.user.id
    } 
  });  
 }else{
  const updateBio = await prisma.Profile.update({
    where: {  userId: req.user.id },
    data: { bio : Bio.bio},
 })}

 const newBio = await prisma.Profile.findUnique({
  where: { userId: req.user.id },
})

res.json(newBio) 
 };

module.exports.getBio=async(req,res)=>{
  const bio = await prisma.Profile.findUnique({
    where: { userId: req.user.id },
  })
  res.json(bio)
}

