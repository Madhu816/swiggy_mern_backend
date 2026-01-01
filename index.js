const express = require("express");
const dotEnv=require("dotenv");// pick the environmental file
dotEnv.config(); // acessing the env information
const mongoose = require("mongoose");
const VenderRoutes = require('./routers/venderRoutes');
const bodyParser = require("body-parser");
const firmRoutes = require("./routers/firmRoutes");
const productRoutes = require("./routers/productRouters");
const cors = require("cors"); 
// for cors Because we want to ALLOW frontend → backend request.
//its like a talking 
//Cross-Origin Resource Sharing       
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

// app.use(cors({
//     origin:"http://localhost:5174"
// }))

mongoose.connect(process.env.MONGO_URL)   // process.env.MONGO_URL means accessing & connecting with mongoose
.then(()=>{
  console.log("MONGODB is  sucessfully connected");
}).catch((error)=>{
console.log(error)
}
)

// server reads only the json format
app.use(bodyParser.json());
app.use("/vender",VenderRoutes);
app.use("/firm",firmRoutes)
app.use("/product",productRoutes);
// app.use('/uploads', express.static('uploads'));
//standard for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get("/", (_req, res) => {
  res.send("It is working with MongoDB connection!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at port ${port}`);
});
