const mongoose =  require('mongoose');
const { Schema } = mongoose;
const PurchaseProductSchema = new Schema({
    PurchaseID:{ type: Number},
    ProductID:{type:Number},
    Qty:{type: Number},
    Cost:{type: String},
    Total:{type: String},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const  PurchaseProductModel = mongoose.model("purchaseproducts", PurchaseProductSchema);
module.exports =  PurchaseProductModel;