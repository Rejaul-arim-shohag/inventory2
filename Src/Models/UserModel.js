const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    UserName:{type:String,unique:true},
    Email:{
                type:String,
                unique:true,
                required:true,
                validate:{
                    validator:(v)=>{
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                    },
                    message: "Please enter a valid email"
                }
                },
    UserID:{type:Number,default:function(){return Math.floor(Date.now() / 1000)}},
    Password:{type:String, required:true, minLength:6},
    Image:{type:String, default:""},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel;