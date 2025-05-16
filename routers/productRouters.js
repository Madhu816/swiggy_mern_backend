const express = require("express");
const productController=require("../controllers/productController");
const firmController = require("../controllers/firmController");
const path=require("path");

const router = express.Router();

router.post("/addproduct/:firmid",productController.addProduct);
router.get("/:firmid/products",productController.getProductByFirm);

//for images
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName));

})

router.delete("/:productId",productController.deleteProductById);

module.exports=router;
