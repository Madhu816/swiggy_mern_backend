
const Vender = require('../models/Vender');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.JWT_SECRET

// next - is an function
// if response is Ok then go to next action or further performance
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

// With token ✅

// Server knows who you are
// Only logged-in users can access
// No need to login again & again

// WITHOUT token ❌

// Imagine this:
// You login
// You go to Add Firm
// Server asks → “Login again”
// You go to Add Product
// Server asks → “Login again”
// Every page → login 😖
// 👉 Very bad experience.


// ✅ WITH token (REAL CASE)

// Step 4: Server checks token
// Server says:
// “Okay, I know you. You already logged in.”
// 🧠 Important point
// You are NOT logging in again
// You are showing your ID (token)