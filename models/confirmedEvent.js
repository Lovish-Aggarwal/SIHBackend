const mongoose = require('mongoose');


const confirmedEventSchema = mongoose.Schema({
  
    title:{
      type:String,
      required:true
    },
    confirmationstatus:{
      type:Boolean,
      required:true
    }
    
})

module.exports = mongoose.model('ConfirmedEvent',confirmedEventSchema);


