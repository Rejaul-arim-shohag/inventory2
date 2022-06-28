const BrandModel = require('../Models/BrandModel');
exports.CreateBrand=(req, res)=>{
    BrandModel.create(req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.readBrand=(req, res)=>{
    BrandModel.aggregate([
        {$lookup:{from:"products", localField:"BrandID", foreignField:"BrandID", as:"products"}},
        { $sort : { _id: -1 } },
        {
            $project: {
                _id: 0,
                CreatedDate: 1,
                BrandID: 1,
                Name: 1,
                productLength:{ $size:"$products"}
            }
        }
    ], (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.readBrandById=(req, res)=>{
    const brandId = req.body.brandId;
    BrandModel.find({BrandID:brandId}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.updateBrand=(req, res)=>{
    const brandId = req.params.brandId;
    BrandModel.updateOne({BrandID:brandId},req.body, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.deleteBrand=(req, res)=>{
    const brandId= req.params.brandId;
    BrandModel.deleteOne({BrandID:brandId}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}