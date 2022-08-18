const mongoose = require('mongoose');


const acitePendingEventSchema = mongoose.Schema({
  
    title:{
      type:String,
      required:true
    },
    confirmationstatus:{
      type:Boolean,
      required:true
    }
    
})

module.exports = mongoose.model('AictePendingEvent',acitePendingEventSchema);


