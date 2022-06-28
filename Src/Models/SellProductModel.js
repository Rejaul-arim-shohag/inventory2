const mongoose =  require('mongoose');
const { Schema } = mongoose;
const sellProductSchema = new Schema({
    SellID:{type:Number},
    ProductID:{type:Number},
    Qty:{type:Number},
    Cost:{type:Number},
    Total:{type:Number},
    CreatedDate:{type:Date,default:Date.now()}
}, {versionKey:false});
const SellModel = mongoose.model("sellproducts",sellProductSchema);
module.exports = SellModel;