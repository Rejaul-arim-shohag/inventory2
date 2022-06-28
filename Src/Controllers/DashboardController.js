const SellModel = require("../Models/SellModel");
const PurchaseModel = require("../Models/PurchaseModel");
const ExpenseListModel=require("../Models/ExpenseListModel");
const ReturnModel = require("../Models/ReturnModel");

exports.TotalSell=(req, res)=>{
    SellModel.aggregate([
       {$group:{_id:0, sum:{$sum:{ $toDouble:"$GrandTotal"}}, avgSale:{$avg:{ $toDouble:"$GrandTotal"}}}}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.TotalPurchase=(req, res)=>{
    PurchaseModel.aggregate([
        {$group:{_id:0, sum:{$sum:{$toDouble:"$GrandTotal"}}, avgPurchase:{$avg:{$toDouble:"$GrandTotal"}}}}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.TotalExpense=(req, res)=>{
    ExpenseListModel.aggregate([
        {$group:{_id:0, sum:{$sum:{$toDouble:"$Amount"}},avgExpense:{$avg:{$toDouble:"$Amount"}}}}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.TotalReturn=(req, res)=>{
    ReturnModel.aggregate([
        {$group:{_id:0, sum:{$sum:{$toDouble:"$GrandTotal"}}}}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}