if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
  
  };

const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');

const { Pool } = require('pg');
const cors = require("cors");
const userRoute=require('./auth')
const postsRoute=require('./postsRouter')
const profilRoute=require('./profilRoute')
const commentRoute=require('./commentRoute')
const otherUserRoute=require('./otherUserRoute')
const storyRoute=require('./storyRoute')
const likeRoute=require('./likeRoute')
const notificationRoute=require('./notificationRoute')
const followRoute=require('./followRoute')



app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin:`${process.env.REACT_APP_HOST}`,
  credentials:true
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.REACT_APP_HOST}`);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

const prisma = new PrismaClient();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'karim_data',
  password: 'koukou2017',
  port: 5432, 
});

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
    }),
    name:"newcokiees",
    secret: 'newsessionbro',
    resave: false,
    saveUninitialized: false,
    cookie:{  
      expires:Date.now() + 1000 * 60 * 60 * 24 * 7 ,
      maxAge: 1000 * 60 * 60 * 24 * 7 ,
      
     // httpOnly: true, 
     // secure: true, 
      }
  })
)






app.use(passport.initialize());
app.use(passport.session());






  passport.serializeUser((user, done) => {
    done(null, user);
   
  });
  
  passport.deserializeUser((user, done) => {
   
      done(null, user);
  
  })


 

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Assuming the username field is 'email'
        passwordField: 'password', // Assuming the password field is 'password'
      },
      async (email, password, done) => {
        try {
          const user = await prisma.User.findUnique({ where: { email } });
  
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }
  
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid email or password' }); 
          }
          
          return done(null, user);
          
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  
  
  



 // const storage = multer.diskStorage({ 
 //   destination:(req,file , cb)=>{
  //    cb(null,'uploads')
  //  }, nhebou ndirou storac local f kach fichier hna 3andna wela ndirouh b cloudinary
  //  filename:(req,file,cb)=>{
  //    cb(null,file.fieldname+"_"+file.path)
  //  }
 // })
 

  app.use('/',userRoute)
  app.use('/',postsRoute)
  app.use('/',userRoute)
  app.use('/',profilRoute)
  app.use('/',commentRoute)
  app.use('/',otherUserRoute)
  app.use('/',storyRoute)
  app.use('/',likeRoute)
  app.use('/',notificationRoute)
  app.use('/',followRoute)
  





  app.get('/logout',(req,res,next)=>{ 
    req.logout(function(err) {
      if (err) { return next(err); }
      else{res.redirect(`${process.env.REACT_APP_HOST}/login`)}
    //  res.redirect('http://localhost:3000/login');
    });
   
   // res.redirect('http://localhost:3000/login')    
  })
  
 










  


app.listen(8000,()=>{
    console.log('your port is 8000')
})