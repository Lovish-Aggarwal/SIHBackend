const AicteUser = require('../models/aicteUser')

const {validationResult} = require('express-validator');
var  expressJwt = require('express-jwt'); 
var jwt = require('jsonwebtoken'); // token banane ke kaam mein aata h

// var  expressJwt = require('express-jwt');

exports.signout = (req,res)=>{
  
  res.clearCookie('token');
  res.json({
      message : "User signed out"
  })

}

exports.signup = (req,res)=>{
  
  //express validator binds the validation result with the req body 
  // Finds the validation errors in this request and wraps them in an object with handy functions
  // console.log(req.body);
  const errors = validationResult(req);
  
    if(!errors.isEmpty())
     {
       return res.status(422).json({
         error: errors.array()[0].msg //.array() converts everything in array 
         //errors is object basically 
       })
     }
  // console.log("signup called")
  // console.log(req.body)
  const user = new AicteUser(req.body);
   
  user.save((err,user)=>{ //saving the user in databse 
     if(err){
       return res.status(400).json({
         err : "Unable to save the user"
       })
     }
      return res.json({
        name : user.name,
        email : user.email,
        id : user._id
      });
  })

}



exports.signin = (req,res)=>{

  const {email,password} = req.body;

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(422).json({
      error:errors.array()[0].msg
    })
  }

  AicteUser.findOne({email},(err,user)=>{
      if(err || !user){
           return res.status(400).json({
            error : "USER email doesn't exist"
       }) 
     }

     if(!user.authenticate(password))
     {
       return res.status(401).json({
          error:"Wrong password"
       })
     }

       //creating a token
        const token = jwt.sign({_id : user._id},"code4o4");
       
        //putting that token into cookie
        res.cookie("token",token,{expires:new Date(Date.now()+50000),httpOnly:true});
 
       //sending response to front-end
 
       const {_id,name,email,role} = user;
 
       return res.json({token,user : {_id,name,email,role}});

  })

}


exports.isSignedIn = expressJwt({ //pehle to ye auth header mein bearer token 
 //doondhega fir use cookie ke token se match krega decode krk id nikalega jo 

 // req.authAicte mein mil jayegi humein 
 
 secret : "code4o4",
 userProperty:"authAicte" //decode krne ke baad iss auth mein id daal di jaati h 
 //jo apan ne token ke liye pass kri thi 
 
})
