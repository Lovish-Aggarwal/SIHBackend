const mongoose = require('mongoose');

const canteenSchema = mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required:true,
  },
  isnonveg:{
    type:Boolean,
    required:true
  },
  whetherbooked:{
    type:[],
    required:true
  }

})

module.exports = mongoose.model("canteens",canteenSchema);