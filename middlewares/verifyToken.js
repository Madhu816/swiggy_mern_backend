
const Vender = require('../models/Vender');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.JWT_SECRET


const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const vender = await Vender.findById(decoded.venderId);

        if (!vender) {
            return res.status(404).json({ error: "vender not found" })
        }

        req.venderId = vender._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }

}

module.exports = verifyToken