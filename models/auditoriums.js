const mongoose = require('mongoose');

const auditoriumSchema = mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required:true,
  },
  sittingcapacity:{
    type:Number,
    required:true
  },
  isac:{
    type:Boolean,
    required:true
  },
  whetherBooked:{
    type:[],
    required:true
  }

})

module.exports = mongoose.model("auditoriums",auditoriumSchema);