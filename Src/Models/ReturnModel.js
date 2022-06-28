const mongoose = require ('mongoose');
const { Schema } = mongoose;
const returnSchema = new Schema({
    CustomerID:{ type: Number},
    ReturnID:{type:Number},
    ReturnCharges:{type: Number},
    GrandTotal:{type: Number},
    Note:{type: String},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const  ReturnModel = mongoose.model("returns",returnSchema);
module.exports =  ReturnModel;