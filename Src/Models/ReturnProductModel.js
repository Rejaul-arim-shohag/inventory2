const mongoose = require ('mongoose');
const { Schema } = mongoose;
const returnProductSchema = new Schema({
    ReturnID:{ type: Number},
    ProductID:{type:Number},
    Qty:{type: Number},
    Cost:{type: Number},
    Total:{type: Number},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const  ReturnProductModel = mongoose.model("returnproducts",returnProductSchema);
module.exports = ReturnProductModel;