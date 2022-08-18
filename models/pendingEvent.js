const mongoose = require('mongoose');


const pendingEventSchema = mongoose.Schema({
  
    title:{
      type:String,
      required:true
    },
    confirmationstatus:{
      type:Boolean,
      required:true
    }
    
})

module.exports = mongoose.model('PendingEvent',pendingEventSchema);


