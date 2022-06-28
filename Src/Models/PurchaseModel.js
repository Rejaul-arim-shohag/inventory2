const mongoose =  require('mongoose');
const { Schema } = mongoose;
const PurchaseSchema = new Schema({
    SupplierID:{ type: Number},
    PurchaseID:{type:Number},
    VatTax:{type: Number},
    Discount:{type: Number},
    OtherCost:{type: Number},
    GrandTotal:{type: Number},
    Note:{type: String},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const  PurchaseModel = mongoose.model("purchases", PurchaseSchema);
module.exports =  PurchaseModel;