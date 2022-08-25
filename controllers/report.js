const reports = require('../models/report');



exports.saveReport = (req,res)=>{
      const data = req.body;

      const temp = new reports(data);

      temp.save((err,obj)=>{
          if(err)
          {
              return res.status(400).json({"error":"some error occured"})
          }
          else{
              return res.status(200).json(obj)
          }
      })
}

exports.reteriveReport = (req,res)=>{
     const id = req.body;
     console.log(id.eventId)
     reports.findOne({eventId:id.eventId})
     .then((result)=>{
        res.status(200).json({result})
     })
     .catch((err)=>{
       res.status(400).json({error:err})
     })
}