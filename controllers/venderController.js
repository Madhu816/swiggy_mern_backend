const Vender = require("../models/Vender");
const jwt=require("jsonwebtoken"); // for used to check if a user is logged in.

const bcrypt=require("bcryptjs");  // for password

const dotEnv=require("dotenv");
dotEnv.config();
const secretKey=process.env.JWT_SECRET;

const venderRegister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const venderEmail=await Vender.findOne({email});
        if(venderEmail){
            return res.status(400).json("Email is already taken..acess another Email");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        //10 is a standard value — good balance between security and speed.

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

const venderLogin=async(req,res) => {
    const {email,password}=req.body;
    try{
        const vender=await Vender.findOne({email});
        if(!vender || !(await bcrypt.compare(password,vender.password))){
            return res.status(401).json({"error":"Invalid email or password"});
        }
        const token=jwt.sign({venderId:vender._id},secretKey,{expiresIn:"1h"});
        console.log("id  is  :",vender._id);

        res.status(200).json({"Sucess":"Login Sucessfully",token});
        console.log(email,"jwt_token is",token);

    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});

    }
}
    const getAllvenders=async (req,res) => {
        try{
            const vender=await Vender.find().populate("firm");
            res.json({vender});


        }catch(error){
            console.error(error);
        res.status(500).json({error:"internal server error"});
         
    }
}
const getVenderId=async (req,res)=>{
    const venderId=req.params.id;
    try {
        const vender=await Vender.findById(venderId).populate("firm");
        if(!vender){
            return res.status(404).json({error:"vender is not fount "});

        }
        res.status(200).json(vender);
        
    } catch (error) {
           console.error(error);
        res.status(500).json({error:"internal server error"});
        
        
    }
}
module.exports={venderRegister,venderLogin,getAllvenders,getVenderId}