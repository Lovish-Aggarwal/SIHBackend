const confirmedEvent = require('../models/confirmedEvent');
const pendingEvent = require('../models/pendingEvent');
const aictePendingEvent = require('../models/aictePendingEvent');
 
exports.eventByAicte = (req,res)=>{

  req.body.confirmationbyinstitute = true;
  req.body.confirmationbyaicte = true;

  req.body.confirmationstatus = true;

  const event = new confirmedEvent(req.body);

  event.save((err,event)=>{

     if(err)
      return res.status(400).json({error:"Error in Saving the event"});

     return res.status(200).json(event); 
  })
}

exports.eventByFaculty = (req,res)=>{
    
req.body.confirmationbyinstitute = false;
req.body.confirmationbyaicte = false;

    const event = new pendingEvent(req.body);
    
    event.save((err,event)=>{

      if(err)
       return res.status(400).json({error:err});
 
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

exports.getEventById2 = (req,res,next,id)=>{
  aictePendingEvent.findById(id,(err,event)=>{
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
    
  const id = req.event._id;
    
    let error = false;

    pendingEvent.deleteOne(
      {_id:id})
     .exec( 
      (err)=>{
           if(err)
          {
            error = true;
          }

       }
     )

     if(error)
    return res.status(400).json({error:"some error occured"})
    
     req.event.confirmationbyinstitute = true;
     req.event.confirmationbyaicte = false;
   
    aictePendingEvent.insertMany(req.event)
    .then((obj)=>{
         res.status(200).json(obj)
    })
    .catch((err)=>{
      console.log(err)
      res.status(400).json({error:"error occurred"})
    })
}

exports.eventConfirmedByAicte = (req,res)=>{
     const id = req.event._id;

    let error = false;


     aictePendingEvent.deleteOne(
      {_id:id}
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
     
      
      req.event.confirmationbyinstitute = true;
      req.event.confirmationbyaicte = true;

      confirmedEvent.insertMany(req.event)
      .then((obj)=>{
           res.status(200).json(obj)
      })
      .catch((err)=>{
        res.status(400).json({error:"error occurred"})
      })
}


exports.storeId = (req,res,next,id)=>{
    req.userId = id;

    next();
}

exports.getConfirmedEvents = (req,res)=>{
     confirmedEvent.find({userid:req.userId})
     .then((obj)=>{
      return res.status(200).json({obj});
     })
     .catch((err)=>{
         return res.status(200).json({"error":"some error is there"})
     })
}



exports.getPendingEvents = async (req,res)=>{

  let obj1;
  let obj2;
  let obj3=[];

  try{
    
   obj1 = await aictePendingEvent.find({userid:req.userId})  
   obj2 =  await pendingEvent.find({userid:req.userId})

   obj3 = obj3.concat(obj1,obj2);
  return res.status(200).json(obj3);
  }
  catch(err){
    console.log(obj3)
    return res.status(400).json({"error":err})
  }
}

exports.getAllConfirmedEvents = (req,res)=>{

  confirmedEvent.find()
  .then((result)=>{
       return  res.status(200).json(result);
  })
  .catch((err)=>{
       return res.status(400).json({"error":err});
  })
}