const mongoose=require ('mongoose');
const { Schema } = mongoose;
const customerSchema = new Schema({
    CustomerName:{ type: String},
    CustomerID:{type:Number, default:function(){return Math.floor(Date.now()/1000)}},
    Phone:{type: String},
    Email:{type: String},
    Address:{type: String},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const  CustomerModel = mongoose.model("customers", customerSchema);
module.exports =  CustomerModel;