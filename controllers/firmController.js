const Firm = require("../models/Firm"); // TAKEN SCHEMA
const vender = require("../models/Vender");
//server only knows venderid,thus y full get data using requiring vender
const multer = require("multer");// for Images
const path = require('path');

// Multer storage configuration
// Standard Format for images using multer
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

const addFirm = async (req, res) => {
    const { firmname, area, category, region, offer } = req.body; // requesting the properties
    const image = req.file ? req.file.filename : undefined;

    try {
        // these give full information about 
        const venderData = await vender.findById(req.venderId);
        if (!venderData) {
            return res.status(404).json({ message: "Vender not found" });
        }
        if(venderData.firm.length>0){
            return res.status(404).json({message:"vender can have only one firm"});
        }

        // Fill the Data
        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vender: venderData._id  // ← linked to logged-in vender //only take vender id 
        });

        
        const savedFirm=await firm.save();
        const firmId=savedFirm._id;
        // firm data pust to vender
        // stores the firm data in vender in array format 
        //Sending the firm data to vender                
        venderData.firm.push(savedFirm);
        await venderData.save();

        return res.status(200).json({ message: "Firm added successfully",firmId });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteFirmById=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const deleteFirm=await Firm.findByIdAndDelete(firmId);
        if(!deleteFirm){
        return res.status(404).json({error:"No firm found"});
        }
        res.status(200).json({ message: "Firm is deleted successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}

