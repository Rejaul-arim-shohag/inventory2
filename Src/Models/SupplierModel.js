const mongoose= require ('mongoose');
const { Schema } = mongoose;
const suppliersSchema = new Schema({
    Name:{type:String,unique:true},
    SupplierID:{type:Number,default:function(){return Math.floor(Date.now() / 1000)}},
    Address:{type:String},
    Phone:{type:String},
    Email:{type:String},
    CreatedDate:{type:Date,default:Date.now()}
}, {versionKey:false});
const SupplierModel = mongoose.model("suppliers",suppliersSchema);
module.exports = SupplierModel;