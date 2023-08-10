const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



module.exports.creatStory= async (req,res)=>{
    const image = req.file;
    const authorId =req.user.id
   // const authId = parseInt(req.params.id)
  if (image == null) {
    
  }else{
    const story = await prisma.Story.createMany({
      data: {
       
       published: true,
       authorId : authorId,
       content:image.path,
   
      }
    });
  }
  const getStory = await prisma.Story.findMany({
    include:{
      author:true
    }
  })
  
  res.json(getStory)  
 };

 module.exports.allStories= async (req,res)=>{
    const getStory = await prisma.Story.findMany({
        include:{
          author:true
        }
      })
      res.json(getStory) 
 };

 module.exports.getStoryIdStoryId= async (req,res)=>{
    const userId= JSON.parse(req.params.id)
    const storyId= JSON.parse(req.params.storiesId)
    const story = await prisma.Story.findUnique({ 
      where:{
        id:storyId,
        authorId:userId},  
      include:{ 
        author:true
      }
    })
  
  
  
    
   res.json(story)  
 };

 module.exports.storiesUser= async (req,res)=>{
    const userId=req.user.id
    const story = await prisma.Story.findMany({ 
      where:{
        authorId:userId
      }
    })
    res.json(story)   
 };

 module.exports.storiesUserId= async (req,res)=>{
    const storyId=JSON.parse(req.params.storyId)
    const story = await prisma.Story.findUnique({ 
      where:{id:storyId},
      include: {
        author: true, 
      }
    })
    res.json(story)
 };

 module.exports.deleteStoris= async (req,res)=>{
    await prisma.Story.delete({ // Delete all comments related to the post
        where: {
          id: req.body.storieId
        } 
      })
    
      const getStory = await prisma.Story.findMany({
        include:{
          author:true
        }
      })
      res.json(getStory)  
 };

 module.exports.storieuserStoryuserId= async (req,res)=>{
    const storyId= JSON.parse(req.params.storyuserId) 
   
   const story = await prisma.Story.findUnique({ 
    where:{id: storyId},
    include: {
      author: true, 
    }
  })
  
  res.json(story)    
 };