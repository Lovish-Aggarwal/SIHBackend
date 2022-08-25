// const auditoriums = require("../models/auditoriums");
const Auditoriums = require("../models/auditoriums");

exports.createAuditorium = (req,res)=>{
      
  // console.log("i am here")
     const auditoriums = new Auditoriums(req.body);

     auditoriums.save((err,audi)=>{
        if(err){
          return res.status(400).json({
            error : err
          })
        }
        //  console.log(audi.whetherBooked[0].date)

        return res.status(200).json(audi)
     })

}

exports.getAllAuditorium = (req,res)=>{
   
   Auditoriums.find().then((result)=>{
    return res.status(400).json(result)
   })

}

exports.enterId = (req,res,next,audiId)=>{
  
  req.audiId = audiId;
  next();

}

exports.bookAuditorium = (req,res)=>{
   
    // let error  = false;

  Auditoriums.findById(
    {_id:req.audiId}
  ).then((result)=>{
    if(result.whetherBooked.findIndex(x=>x.date==req.body.date)!==-1) 
      return res.status(200).json({status:"Auditorium already booked"});      
  }).catch((e)=>{
    console.log(e)
  })

  
    Auditoriums.updateOne(
      {_id:req.audiId},
      {$push:{whetherBooked:{name:req.body.name,date:req.body.date}}}
    ).then(()=>{
      return res.status(200).json({
          Success : "Booked Successfully"
      })
    })
    .catch((err)=>{
      return res.status(400).json({
         error : err
      })
    })
}
