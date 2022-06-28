const  mongoose = require ('mongoose');
const { Schema } = mongoose;
const expenseTypeSchema = new Schema({
    Name:{type: String, unique: true},
    TypeID:{type:Number, default:function(){return Math.floor(Date.now()/1000)}},
    CreatedDate:{type:Date, default:Date.now()}
}, {versionKey:false});
const ExpenseTypeModel = mongoose.model("expensetypes", expenseTypeSchema);
module.exports =  ExpenseTypeModel;