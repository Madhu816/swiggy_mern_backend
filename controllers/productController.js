const Product=require("../models/Product");
const Firm=require("../models/Firm");
const multer=require("multer");
const path=require("path");
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Folder to store files
    },
    filename: (req, file, cb) => {
        // Rename file with date + original name
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
// Upload middleware
const upload = multer({ storage: storage });

const addProduct=async(req,res)=>{
    const {productName,price,category,bestseller,description}=req.body;
    const image=req.file?req.file.filename:undefined;
    try{
        const firmId=req.params.firmid;
        const firmData=await Firm.findById(firmId);
        if(!firmData){
            return res.status(404).json({error:"No firm data.. "})
        }
        const product=new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm:firmData._id
        })
        const savedProduct=await product.save();
        firmData.product.push(savedProduct);
        await firmData.save();
        
        res.status(200).json(savedProduct);

    }catch(error){
         console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
}
const getProductByFirm=async (req,res)=>{
    try{
        const firmId= req.params.firmid;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No firm found"});
        }
        const restarentName=firm.firmname; //restarent name
        const product=await Product.find({firm:firmId});
        return res.status(200).json({restarentName,product});                        


    }catch(error){
          console.log(error);
         return res.status(500).json({ message: "Internal server error" });


    }
}
const deleteProductById=async(req,res)=>{
    try {
        const productId=req.params.productId;
        const deleteProduct=await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
        return res.status(404).json({error:"No product found"});
        }
        return res.status(200).json({ message: "Product is deleted successfully" });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
module.exports={addProduct:[upload.single("image"),addProduct],getProductByFirm,deleteProductById }