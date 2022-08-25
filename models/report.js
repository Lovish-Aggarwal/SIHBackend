const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const reportSchema = mongoose.Schema({

  eventId:{
     type:String,
     required:true  
  },
  data:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('reports',reportSchema);