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

exports.bookAuditorium = async(req,res)=>{
   
    // let error  = false;

    let result;
  
    try{
        result = await Auditoriums.findById({_id:req.audiId})
        
        if(result.whetherbooked.findIndex(x=>x.date==req.body.date)!==-1){
          console.log("here")
          return res.status(400).json({status:"Auditorium already booked"}); 
        }     
        
      
        await Auditoriums.updateOne(
          {_id:req.audiId},
          {$push:{whetherbooked:{name:req.body.name,date:req.body.date}}}
        ).then(()=>{
          return res.status(200).json({
            Success : "Booked Successfully"
          })
        })
        
      }
      catch(error){
           return res.json({error:"some error occured"})
      }

}
