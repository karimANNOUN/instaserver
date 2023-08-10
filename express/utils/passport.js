const express = require('express')


module.exports.isAuth=(req,res,next)=>{
  if(req.user){
    next()
  }else{
    res.json({message:"sorry you must signin"})
  }
}