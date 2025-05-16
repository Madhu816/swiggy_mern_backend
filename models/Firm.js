const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        enum: ['veg', 'non-veg']
    },
    region: {
        type: [String],
        enum: ["south-indian", "north-indian", "chines", "bakery"]
    },
    offer: {
        type: String

    },
    image: {
        type: String
    },
    //for relation
    vender:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vender"
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]

})
 
const Firm=mongoose.model("Firm",firmSchema);
module.exports=Firm;