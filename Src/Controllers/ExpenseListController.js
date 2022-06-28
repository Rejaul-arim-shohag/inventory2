const ExpenseListModel=require("../Models/ExpenseListModel");
exports.CreateExpenseList=(req, res)=>{
    const reqBody= req.body;
    ExpenseListModel.create(reqBody, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.UpdateExpenseList=(req, res)=>{
    const ExpenseID = req.params.ExpenseID;
    ExpenseListModel.updateOne({ExpenseID:ExpenseID}, req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.DeleteExpenseList=(req, res)=>{
    const ExpenseID = req.params.ExpenseID;
    ExpenseListModel.deleteOne({ExpenseID:ExpenseID}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}
exports.ReadExpenseList=(req, res)=>{
    ExpenseListModel.aggregate([
        {$lookup:{from:"expensetypes", localField:"TypeID",foreignField:"TypeID", as:"Type"}},
        {$project:{
             _id:0,
             TypeID:1,
             Amount:1,
             Note:1,
             CreatedDate:1,
             ExpenseID:1,
             TypeName:{$first:"$Type.Name"}
            }}
    ], (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.readExpenseById=(req, res)=>{
    const ExpenseID = req.params.ExpenseID;
    ExpenseListModel.find({ExpenseID:ExpenseID}, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

