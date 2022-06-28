const ExpenseTypeModel = require("../Models/ExpenseTypeMode");
exports.CreateExpenseType=(req, res)=>{
    ExpenseTypeModel.create(req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}
exports.ReadExpenseType=(req, res)=>{
    ExpenseTypeModel.aggregate([
        {$lookup:{from:"expenselists", localField:"TypeID", foreignField:"TypeID",as:"expenseList"}},
         { $sort : {_id : -1 } },
        {$project:{
        _id:0,
        Name:1,
        TypeID:1,
        amountOfExpense:{$sum:"$expenseList.Amount"}
        }},
    ], (err,data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
exports.UpdateExpenseType=(req, res)=>{
    const TypeID = req.params.TypeID;
    ExpenseTypeModel.updateOne({TypeID:TypeID}, req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.DeleteExpenseType=(req, res)=>{
    const TypeID = req.params.TypeID;
    ExpenseTypeModel.deleteOne({TypeID:TypeID}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}