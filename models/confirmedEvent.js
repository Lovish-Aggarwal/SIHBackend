const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const confirmedEventSchema = mongoose.Schema({
  
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
  },auditoriumid:{
    type:ObjectId,
    required:true,
    default:null
  },
  canteenid:{
    type:ObjectId,
    required:true,
    default:null
  },
  typeOfEvent:{
    type:String,
    required:true
  },
  eventexpenditure:{
    type : String,
    required:true
  },
  tada:{
     type:String,
     required:true
  },
  other:{
    type:String,
    required:true
  },
  total:{
    type:String,
    required:true
  },
  instituteid:{
    type:String,
    required:true
  }
    
})

module.exports = mongoose.model('ConfirmedEvent',confirmedEventSchema);


