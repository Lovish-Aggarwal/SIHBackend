const confirmedEvent = require('../models/confirmedEvent');
const pendingEvent = require('../models/pendingEvent');
const aictePendingEvent = require('../models/aictePendingEvent');
 
exports.eventByAicte = (req,res)=>{

  req.body.confirmationstatus = true;

  const event = new confirmedEvent(req.body);

  event.save((err,event)=>{

     if(err)
      return res.status(400).json({error:"Error in Saving the event"});

     return res.status(200).json(event); 
  })
}

exports.eventByFaculty = (req,res)=>{
    

    const event = new pendingEvent(req.body);
    
    event.save((err,event)=>{

      if(err)
       return res.status(400).json({error:"Error in Saving the event"});
 
      return res.status(200).json(event); 
   })

}


exports.getEventById = (req,res,next,id)=>{
     pendingEvent.findById(id,(err,event)=>{
          if(err || !event ){
            return res.status(400).json({
              error : "No event found"
            })
          }

          req.event = event;
          
          // req.event.id = event._id;
          // req.event._id = undefined;
          next();
     })
}

exports.eventConfirmedByInstitute = (req,res)=>{
    
  // req.event.confirmationstatus = true;

    aictePendingEvent.insertMany(req.event)
    .then((obj)=>{
         res.status(200).json(obj)
    })
    .catch((err)=>{
      res.status(400).json({error:"error occurred"})
    })
}

exports.eventConfirmedByAicte = (req,res)=>{
     const id = req.event._id;

    let error = false;

     pendingEvent.findByIdAndUpdate(
      {_id:id},
      {confirmationstatus:true},
      {new:true})
     .exec( 
      (err)=>{
           if(err)
          {
            error = true;
          }

       }
     )

     aictePendingEvent.findByIdAndUpdate(
      {_id:id},
      {confirmationstatus:true},
      {new:true}
     ).exec( 
      (err)=>{
           if(err)
          {
            error = true;
          }

       }
     )
    
     if(error)
      res.status(400).json({error:"some error occured"})
     
      
      req.event.confirmationstatus = true;

      confirmedEvent.insertMany(req.event)
      .then((obj)=>{
           res.status(200).json(obj)
      })
      .catch((err)=>{
        res.status(400).json({error:"error occurred"})
      })
}