const  mongoose=require('mongoose');
const { Schema } = mongoose;
const barndSchema = new Schema({
    Name:{ type: String, unique:true},
    BrandID:{type:Number, default:function(){return Math.floor(Date.now()/1000)}},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const BrandModel = mongoose.model("brands", barndSchema);
module.exports = BrandModel;