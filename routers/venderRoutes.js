const VenderController = require("../controllers/venderController");// for a
const express = require("express");

const router = express.Router();

// post - send the data to the server
// get - get the data to the server     

router.post('/register', VenderController.venderRegister); 
router.post('/login', VenderController.venderLogin);
router.get("/allvenders",VenderController.getAllvenders);
router.get("/single-vender/:id",VenderController.getVenderId); //dynamic id pass :id


module.exports = router;
