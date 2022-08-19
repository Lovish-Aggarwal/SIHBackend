const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pendingEventSchema = mongoose.Schema({
  
    title:{
      type:String,
      required:true
    },
    confirmationbyinstitute:{
      type:Boolean,
      required:true
    },
    confirmationbyaicte:{
      type:Boolean,
      required:true
    },
    eventname:{
      type:String,
      required:true
    },
    eventdetail:{
      type:String,
      required:true
    },
    eventdate:{
      type:Date,
      required:true
    },
    organisation:{
       type:String,
       required:true
    },
    noofparticipants:{
      type:Number,
      required:true
    },
    duration:{
       type:Number,
       required:true
    },
    userid:{
      type:ObjectId,
      required:true
    }
})

module.exports = mongoose.model('PendingEvent',pendingEventSchema);


