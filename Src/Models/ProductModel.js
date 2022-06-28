const mongoose =  require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    CategoryID:{type: Number},
    BrandID:{type: Number},
    ProductID:{type:Number, default:function(){return Math.floor(Date.now()/1000)}},
    Name:{type: String},
    Price:{type: Number},
    Unit:{type: String},
    Stock:{type: Number},
    Details:{type: String},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const ProductModel = mongoose.model("products", ProductSchema);
module.exports =  ProductModel;