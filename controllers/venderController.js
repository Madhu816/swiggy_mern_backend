const Vender = require("../models/Vender"); // importing the Vender file
// .. -> means back 2 steps and go to models in vender file  acessing by using require; 
const jwt=require("jsonwebtoken"); // for used to check if a user is logged in.
// Create a token when user logs in
// Check the token for protected routes

const bcrypt=require("bcryptjs");  // for password protection 
// eg : pass : 1234 bydefault it stores like "AE!@dje124e4" these like
// not understand also user also,..

const dotEnv=require("dotenv");
dotEnv.config();                                  
const secretKey = process.env.JWT_SECRET;// for the Token 

const venderRegister = async(req,res)=>{
    const {username,email,password}=req.body; // requesting for vendors;
    try{
        const venderEmail=await Vender.findOne({email});
        if(venderEmail){
            return res.status(400).json({message:"Email is already taken..acess another Email",venderEmail});
        }

//         if (venderEmail) {
//   return res.status(400).json({
//     message: "Email is already taken..access another Email",
//     emailFound: venderEmail.email   // 👈 only send email, not whole DB object
//   });
// }
        const hashedPassword=await bcrypt.hash(password,10);
        // orginal "madhu123" → after bcrypt "$2a$10$kJH...9dQ"
        //10 is a standard value — good balance between security and speed.

        // when Not Register user 
        const newVender =new Vender({
            username,
            email,
            password:hashedPassword            
        })
        await newVender.save();
        res.status(201).json({message:"vender regestered sucessfully"});
        console.log("registered..");
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});
    }
}
// when vendor is Register then go to  Login Page 
const venderLogin = async(req,res) => {
    const {email,password}=req.body;
    try{
        const vender=await Vender.findOne({email});// get email

        // check the email and password is not correct  Failed Status
        if(!vender || !(await bcrypt.compare(password,vender.password))){
            return res.status(401).json({error : "check email or password any thing enter wrong..."});
        }
        //token create
        const token=jwt.sign({venderId : vender._id},secretKey,{expiresIn:"1h"});
        console.log("id is : ",vender._id);
        
        const venderId=vender._id;

        // For Login Successfull
        res.status(200).json({Sucess : "Login Sucessfully",token,venderId});
        console.log(email,"jwt_token is",token);

    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});

    }
}

// getting all venders 
    const getAllvenders=async (req,res) => {
        try{
            const vender=await Vender.find().populate("firm");// without poupulate only id comming ,with populate data inside the populate
            res.json({vender});

        }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});  
    }
}
// Single VenderShown
const getVenderId=async (req,res)=>{
    const venderId=req.params.id;
    try {
        const vender=await Vender.findById(venderId).populate("firm");//populate firm full details
        // to shown firm details all using these populate
        if(!vender){
            return res.status(404).json({error:"vender is not found "});

        }
        //firm id is in the Vender
        const venderFirmId = vender.firm[0]._id;
        console.log(venderFirmId);

        res.status(200).json({venderId,venderFirmId,vender});
        
    } catch (error) {
           console.error(error);
        res.status(500).json({error:"internal server error"});
    }
}
module.exports={venderRegister,venderLogin,getAllvenders,getVenderId}