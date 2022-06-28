const UsersModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

exports.hello=(req, res)=>{
    res.send("<h1>Hello This is inventory Project, and this project owner Name Rejaulkarim</h1>")
}
//user create Controller
exports.AddUser = (req, res) => {
    UsersModel.create(req.body,(err, data) => {
        if(!err){
            res.status(200).json({ "Status": "Success", "data": data })
        }
        else{
            res.status(500).json({ "Status": "Fail", "data": err })
        }
    })
}

// update user
exports.Update=(req, res)=>{
    const UserId=req.params.UserId;
    UsersModel.updateOne({UserID:UserId}, req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        }
        else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
        
}

//read user Controller
exports.AllUsers=(req, res)=>{
    UsersModel.find({}, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
           
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
//user account delete
exports.DeleteUser=(req, res)=>{
    const UserId = req.params.Userid;
        UsersModel.deleteOne({UserId:UserId}, (err, data)=>{
            if(err){
                res.status(403).json({"Status":"fail", "data":err})
            }
            else{
                res.status(200).json({"Status":"success","data":data})
            }
        })
}
//login user
exports.LoginUser = (req, res) => {
    UsersModel.find({ Email: req.body.Email, Password:req.body.Password }, (err, data) =>{
        if (!err && data.length > 0) {
            const payload={Email:data[0].Email, Id:data[0]._id}
            const token =  jwt.sign(
                payload
                   , "secret123", {expiresIn: "7d" })
                res.status(200).json({ "status": "login successfully", "token": token })
        }
        else {
            res.status(401).json({ status: "fail", data: "wrong email address or password" })
        }
    })
}
