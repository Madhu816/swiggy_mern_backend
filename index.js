const express = require("express");
const dotEnv=require("dotenv");
const mongoose = require("mongoose");
const VenderRoutes=require('./routers/venderRoutes');
const bodyParser=require("body-parser");
const firmRoutes=require("./routers/firmRoutes");
const productRoutes=require("./routers/productRouters");

const path=require("path");

const app = express();
const port = 3000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("MONGODB is  sucessfully connected");
}).catch((error)=>{
console.log(error)
}
)

app.use(bodyParser.json());
app.use("/vender",VenderRoutes);
app.use("/firm",firmRoutes)
app.use("/product",productRoutes);
app.use('/uploads', express.static('uploads'));



app.get("/", (req, res) => {
  res.send("It is working with MongoDB connection!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at port ${port}`);
});
