const VenderController = require("../controllers/venderController");
const express = require("express");

const router = express.Router();

router.post('/register', VenderController.venderRegister);
router.post('/login', VenderController.venderLogin);
router.get("/allvenders",VenderController.getAllvenders);
router.get("/single-vender/:id",VenderController.getVenderId); //dynamic id pass :id


module.exports = router;
