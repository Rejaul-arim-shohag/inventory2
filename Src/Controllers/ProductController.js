const productModel = require("../Models/ProductModel");
exports.CreateProduct=(req, res)=>{
    const reqBody = req.body;
    productModel.create(reqBody, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.updateProduct=(req, res)=>{
    const productId=req.params.ProductID;
    const query={ProductID:productId};
    productModel.updateOne(query, req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })

}

exports.deleteProduct=(req, res)=>{
    const productId=req.params.ProductID;
    const query={ProductID:productId};
     productModel.deleteOne(query, (err, data)=>{
         if(!err){
             res.status(200).json({"status":"success", "data":data})
         } else {
             res.status(500).json({"status":"fail", "data":err})
         }
     })
}

exports.readProduct=(req, res)=>{
    productModel.aggregate([
        {$lookup:{from:"categories",localField:"CategoryID",foreignField:"CategoryID", as:"category"}},
        {$lookup:{from:"brands",localField:"BrandID", foreignField:"BrandID", as:"brand"}},
        {$project:{
            _id:0,
            CategoryID:1,
            BrandID:1,
            Name:1,
            Price:1,
            Unit:1,
            Stock:1,
            Details:1,
            CreatedDate:1,
            ProductID:1,
            categoryName:{$first:"$category.Name"},
            brandName:{$first:"$brand.Name"}
        }}
    ], (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success","data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.readProductById=(req, res)=>{
    const productId = parseInt(req.params.ProductID);
    productModel.aggregate([
        {$match:{ProductID:productId}},
        {$lookup:{from:"categories", localField:"CategoryID", foreignField:"CategoryID", as:"category"}},
        {$lookup:{from:"brands", localField:"BrandID", foreignField:"BrandID", as:"brand"}},
        {$project:{
        _id:0,
        CategoryID:1,
        BrandID:1,
        Name:1,
        Price:1,
        Unit:1,
        Stock:1,
        Details:1,
        ProductID:1,
        categoryName:{$first:"$category.Name"},
        brandName:{$first:"$brand.Name"}
        }}
    ],(err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })

}

