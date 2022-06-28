const mongoose =  require('mongoose');
const { Schema } = mongoose;
const sellSchema = new Schema({
    CustomerID:{type:Number},
    SellID:{type:Number},
    VatTax:{type:Number},
    OtherCost:{type:Number},
    Discount:{type:Number},
    GrandTotal:{type:Number},
    Note:{type:String},
    CreatedDate:{type:Date,default:Date.now()}
}, {versionKey:false});
const SellModel = mongoose.model("sells",sellSchema);
module.exports = SellModel;