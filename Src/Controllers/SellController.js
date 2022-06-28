const SellModel = require("../Models/SellModel");
const SellProductModel = require("../Models/SellProductModel");
exports.CreateSell=(req, res)=>{
    const Sell={
        CustomerID:req.body.CustomerID,
        SellID:req.body.SellID,
        VatTax:req.body.VatTax,
        OtherCost:req.body.OtherCost,
        Discount:req.body.Discount,
        GrandTotal:req.body.GrandTotal,
        Note:req.body.Note,
    }
    SellModel.create(Sell, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            SellProductModel.insertMany(req.body.Products, (err2, data2)=>{
                if(err){
                    res.status(500).json({"status":"fail", "data":err2})
                } else{
                    res.status(200).json({"status":"success","data":data2})
                }
            })
        }
    })
}

exports.ReadSell=(req, res)=>{
    SellModel.aggregate([
        {$lookup:{from:"customers", localField:"CustomerID", foreignField:"CustomerID", as:"customer"}},
        {$sort:{_id:-1}},
        {$project:{
            _id:0,
            CustomerID:1,
            SellID:1,
            VatTax:1,
            OtherCost:1,
            Discount:1,
            GrandTotal:1,
            Note:1,
            CreatedDate:1,
            CustomerName:{$first:"$customer.CustomerName"},
            CustomerPhone:{$first:"$customer.Phone"},
            CustomerEmail:{$first:"$customer.Email"},
            CustomerAddress:{$first:"$customer.Address"},
            CustomerCreatedDate:{$first:"$customer.CreatedDate"},
        }}
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
exports.ReadSellProducts=(req, res)=>{
    const SellID = req.params.SellID;
    const query = {SellID:parseInt(SellID)}
    SellProductModel.aggregate([
        {$match:query},
        {$lookup:{from:"products",localField:"ProductID", foreignField:"ProductID", as:"products" }},
        {$unwind:"$products"},
        {$lookup:{from:"brands", localField:"products.BrandID", foreignField:"BrandID", as:"brands"}},
        {$lookup:{from:"categories", localField:"products.CategoryID",foreignField:"CategoryID", as:"categories"}},
        {$project:{
            _id:0,
            SellID:1,
            ProductID:1,
            Qty:1,
            Cost:1,
            Total:1,
            CreatedDate:1,
            products:{
                CategoryID:1,
                BrandID:1,
                Name:1,
                Price:1,
                Unit:1,
                Stock:1,
                Details:1,

            },
            brandName:{$first:"$brands.Name"},
            categoryName:{$first:"$categories.Name"}
        }}
       
    ], (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.DeleteSell=(req, res)=>{
    const SellID = req.params.SellID;
    const query = {SellID:parseInt(SellID)};
    SellModel.deleteOne(query, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            SellProductModel.deleteMany(query, (err2, data2)=>{
                if(err2){
                    res.status(500).json({"status":"fail", "data":err2})
                } else{
                    res.status(200).json({"status":"success",data:data2})
                }
            })
        }
    })
}