const express = require("express");
const dotEnv=require("dotenv");
dotEnv.config();
const mongoose = require("mongoose");
const VenderRoutes=require('./routers/venderRoutes');
const bodyParser=require("body-parser");
const firmRoutes=require("./routers/firmRoutes");
const productRoutes=require("./routers/productRouters");
const cors = require("cors"); 

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

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



app.get("/", (_req, res) => {
  res.send("It is working with MongoDB connection!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at port ${port}`);
});
