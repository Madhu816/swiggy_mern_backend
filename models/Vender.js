const mongoose=require("mongoose");

//Vendor Registarion
const venderSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ///refance
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]
    
})
const Vender=mongoose.model("Vender",venderSchema); 
module.exports=Vender;
// exponet these vendersSchema as Vender
// and use to another