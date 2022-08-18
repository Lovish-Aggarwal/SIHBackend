const Institute = require('../models/Institute')

const {validationResult} = require('express-validator');
var  expressJwt = require('express-jwt'); 
var jwt = require('jsonwebtoken'); // token banane ke kaam mein aata h


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
  const user = new Institute(req.body);
   
  user.save((err,user)=>{ //saving the user in databse 
     if(err){
       return res.status(400).json({
         err : "Unable to save the user"
       })
     }
      return res.json({
        name : user.Name,
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

   Institute.findOne({email},(err,user)=>{
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
  
        return res.json({token,user : {_id,name,email,role},userType:"Institute"});

   })

}

// exports.isSignedIn = (req,res,next)=>{
//    const token  = req.cookies.token;

//    if(token == null)
//    {
//       return res.status(400)
//       .json({error:"Please Sign In"})
//    }

//   next();
// }

exports.isSignedIn = 
  expressJwt({ 
    secret : "code4o4",
    userProperty:"auth"
  })

  


