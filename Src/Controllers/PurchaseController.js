const PurchaseModel = require("../Models/PurchaseModel");
const PurchaseProductModel = require("../Models/PurchaseProductModel");

exports.CreartePurchase=(req, res)=>{
    const purchase = {
        SupplierID:req.body.SupplierID,
        PurchaseID:req.body.PurchaseID,
        VatTax:req.body.VatTax,
        Discount:req.body.Discount,
        OtherCost:req.body.OtherCost,
        GrandTotal:req.body.GrandTotal,
        Note:req.body.Note,
    }
    const Products = req.body.Products;
    PurchaseModel.create(purchase, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            PurchaseProductModel.insertMany(Products, (err2, data)=>{
                if(err){
                    res.status(500).json({"status":"fail", "data":err2})
                } else{
                    res.status(200).json({"status":"success", "data":data})
                }
            })
        }
    })
}

exports.ReadPurchase=(req, res)=>{
    PurchaseModel.aggregate([
        {$lookup:{from:"suppliers", localField:"SupplierID", foreignField:"SupplierID", as:"Supplier"}},
        {$sort:{_id:-1}},
        {$project:{
            _id:0,
            SupplierID:1,
            PurchaseID:1,
            VatTax:1,
            Discount:1,
            OtherCost:1,
            GrandTotal:1,
            Note:1,
            CreatedDate:1,
            SupplierName:{$first:"$Supplier.Name"},
            SupplierAddress:{$first:"$Supplier.Address"},
            SupplierPhone:{$first:"$Supplier.Phone"},
            SupplierEmail:{$first:"$Supplier.Email"}
        }}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        }
        else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.ReadPurchaseProduct=(req, res)=>{
    const PurchaseID = req.params.PurchaseID;
    const query = {PurchaseID:parseInt(PurchaseID)};
    console.log(query)
    PurchaseProductModel.aggregate([
        {$match:query},
        {$lookup:{from:"products", localField:"ProductID", foreignField:"ProductID", as:"products"}},
        {$unwind:"$products"},
        {$lookup:{from:"categories", localField:"products.CategoryID", foreignField:"CategoryID", as:"category"}},
        {$lookup:{from:"brands", localField:"products.BrandID", foreignField:"BrandID", as:"brand"}},
        {$project:{
            _id:0,
            PurchaseID:1,
            ProductID:1,
            Qty:1,
            Cost:1,
            Total:1,
            CreatedDate:1,
            products:
                {
                    CategoryID:1,BrandID:1,Name:1,Price:1,Unit:1,Stock:1,Details:1,
                },
           category:{Name:1},
           brand:{Name:1}   
        }}
        ], (err, data)=>{
            if(err){
                res.status(500).json({"status":"fail", "data":err})
            } else{
                res.status(200).json({"status":"successeeeee", "data":data})
            }
        })

}
// PurchaseProductModel.aggregate([
//     {$match:query},
//     {$lookup:{from:"products", localField:"ProductID", foreignField:"ProductID", as:"products"}}, 
//     {$unwind:"$products"},
//     {$lookup:{from:"brands", localField:"products.BrandID", foreignField:"BrandID", as:"products.brands"}},
//     {$lookup:{from:"categories", localField:"products.CategoryID", foreignField:"CategoryID", as:"products.categories"}},
//     {$project:{
//         _id:0,
//         PurchaseID:1,
//         ProductID:1,
//         Qty:1,
//         Cost:1,
//         Total:1,
//         CreatedDate:1,
        
//     }}
// ]

exports.DeletePurchase=(req, res)=>{
    const PurchaseID = req.params.PurchaseID;
    const query = {PurchaseID:parseInt(PurchaseID)};
    PurchaseModel.deleteOne(query, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":"err"})
        } else{
            PurchaseProductModel.deleteMany(query, (err2, data2)=>{
                if(err){
                    res.status(500).json({"status":"fail", "data":err2})
                }
                else{
                    res.status(200).json({"status":"success", "data":data2})
                }
            })
        }
    })
}

