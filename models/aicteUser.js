const mongoose  = require('mongoose')
const crypto  = require('crypto')


var aicteUserSchema = new mongoose.Schema({

 email : {
    type:String,
    trim:true,
    required:true,
    unique : true
 },
  encry_password : {
    type:String,
    required :true
  },
  salt:String,
  Name:{
    type:String,
    required:true,
    trim:true
  },
  PhoneNumber:{
    type:String,
    required:true,
    trim:true
  },
  Designation:{
      type:String,
      required:true,
      trim:true
  }
},{timestamps:true})


aicteUserSchema.virtual("password")
.set(function(password){
  this._password = password;
  this.salt = "code4o4sih"
  this.encry_password = this.securePassword(password);
})
.get(function(){
  return this._password;
})


aicteUserSchema.methods = {

  authenticate : function(plainPassword){
     
      return this.securePassword(plainPassword)===this.encry_password;
     
  },
  securePassword : function(plainPassword){
         
    if(!plainPassword)
     return ""

     try {
       return  crypto.createHmac('sha256', this.salt)
       .update(plainPassword)
       .digest('hex');
     } catch (error) {
       console.log(error)
        return "";
     }
  }
}


module.exports = mongoose.model('AicteUser',aicteUserSchema) //this User is a collection in simple
//terms and basically it is like a class from which we can create many instances  