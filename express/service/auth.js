const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();







module.exports.loginFaild= async (req,res)=>{
    res.status(401).json({
        success : false ,
        message : "failure" ,
    })    
 };

 module.exports.loginSuccess= async (req,res)=>{
    if(req.user){
        res.status(200).json({
          success : true ,
          message : "success" ,
          user:req.user
        })
      }else{
        res.send("sorry you must login")
      }  
 };

 module.exports.registerPost= async (req,res,next)=>{
    try {
 
        const { email, name , password } = req.body;
    
        const existingUser = await prisma.User.findUnique({ where: { email } });
    
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.User.create({
          data: {
            name:name,
            email:email,
            password: hashedPassword,
            testingId: "" 
          },
        });
    
        req.login(newUser, (err) => {
          if (err) {
            return next(err);
          }
       
          return res.json({ user: newUser }); 
        });
      } catch (error) {
        return next(error);
      }
 };

 module.exports.loginPost= async (req,res)=>{
  if(!req.user){
    return res.json({message:"unAuthorize"})
  }else{
    return res.json({ user: req.user });
  }
   
 };

 module.exports.user= async (req,res)=>{
    const user = req.user; 
 
    res.json( user)
 };
