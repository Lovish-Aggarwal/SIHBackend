// const auditoriums = require("../models/auditoriums");
const canteens = require("../models/canteen");

exports.createCanteen = (req,res)=>{
      
  // console.log("i am here")
     const canteen = new canteens(req.body);

     canteen.save((err,canteen)=>{
        if(err){
          return res.status(400).json({
            error : err
          })
        }
        //  console.log(audi.whetherBooked[0].date)

        return res.status(200).json(canteen)
     })

}

exports.getAllCanteen = (req,res)=>{
   
   canteens.find().then((result)=>{
    return res.status(400).json(result)
   })

}

exports.enterId = (req,res,next,canteenId)=>{
  
  req.canteenId = canteenId;
  next();

}

exports.bookCanteen = async(req,res)=>{
   
  let result;
  
try{
    result = await canteens.findById({_id:req.canteenId})
    
    if(result.whetherbooked.findIndex(x=>x.date==req.body.date)!==-1){
      console.log("here")
      return res.status(400).json({status:"Canteen already booked"}); 
    }     
    
  
    await canteens.updateOne(
      {_id:req.canteenId},
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
