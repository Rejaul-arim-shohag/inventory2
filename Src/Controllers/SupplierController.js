const SupplierModel=require("../Models/SupplierModel");

exports.CreateSupplier=(req, res)=>{
    SupplierModel.create(req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}
exports.ReadSuppliers=(req, res)=>{
    SupplierModel.aggregate([
        {$lookup:{from:"purchases", localField:"SupplierID", foreignField:"SupplierID", as:"purchases"}},
        {$project:{
        _id:0,
        Name:1,
        Address:1,
        Phone:1,
        Email:1,
        CreatedDate:1,
        SupplierID:1,
        totalPurchase:{$sum:"$purchases.GrandTotal"}
        }} 
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        }else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

//update supplier
exports.UpdateSupplier=(req, res)=>{
    const SupplierID= req.params.SupplierID;
    SupplierModel.updateOne({SupplierID:SupplierID}, req.body, (err, data)=>{
        if(!err) {
            res.status(200).json({"status":"success", "data":data})
        }else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

//readSupplierById
exports.ReadSupplierByID=(req, res)=>{
    const supplierID = req.params.supplierID;
    SupplierModel.find({SupplierID:supplierID}, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
exports.DeleteSupplier=(req, res)=>{
    const SupplierID= req.params.SupplierID;
    SupplierModel.deleteOne({SupplierID:SupplierID}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}