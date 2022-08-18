const aicteUser = require('../models/aicteUser');
const facultyUser = require("../models/facultyMembers");
const instituteUser = require("../models/Institute");


let mydb = aicteUser;

exports.getUserById = (req,res,next,id)=>{

  
  const url = req.originalUrl;

  if(url.indexOf("Institute")!=-1)
      mydb = instituteUser;
  else
  if(url.indexOf("Faculty")!=-1)
    mydb = facultyUser;
     
    console.log(mydb)
  mydb.findById(id,(err,user)=>{
   if(err || !user){
      return res.status(400).json({
        error : "No user was found in database"
      })
   }
   
  //  console.log(user)
    req.profile = user;
    next();
})
}

exports.updateUser = (req,res)=>{

  mydb.findByIdAndUpdate(
    {_id : req.profile._id},
    {$set : req.body},
    {new : true}, //this new true return updated object is we don't set 
    //it to true then old object will be returned after updation
    (err,user)=>{
       if(err)
         return res.status(400).json({
            error : "you are not authorized"
         })

          user.salt = undefined; 
          user.encry_password = undefined;
         return res.status(200).json({user})
    }
 )

    // return res.json({found:"ok"});
}

exports.getUser = (req,res)=>{
  //isse ye properties hidden ho jaayengi user object mein
   req.profile.salt = undefined; 
   req.profile.encry_password = undefined;
   req.profile.updatedAt = undefined;
   

   return res.status(200).json(req.profile);
}
