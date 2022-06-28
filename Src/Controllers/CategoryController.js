const CategoryModel = require("../Models/CategoryModel");
exports.CreateCategoryType = (req, res) => {
    CategoryModel.create(req.body, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "false", "data": err })
        }
    })
}
exports.ReadCategoryById=(req, res)=>{
    const CategoryID = req.params.CategoryID;
    CategoryModel.find({CategoryID:CategoryID},
        {_id:0, CategoryID:1, Name:1}
        ,(err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

exports.ReadCategoryType = (req, res) => {
    CategoryModel.aggregate([
        { $lookup: { from: "products", localField: "CategoryID", foreignField: "CategoryID", as: "products" } },
        { $sort : { _id: -1 } },
        {
            $project: {
                _id: 0,
                name: 1,
                CreatedDate: 1,
                CategoryID: 1,
                Name: 1,
                productLength:{ $size:"$products"}
            }
        }
    ], (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
    
}

exports.UpdateCategoryType = (req, res) => {
    const CategoryId = req.body.CategoryId;
    const query = { CategoryIdID: CategoryId}
    CategoryModel.updateOne(query, req.body, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
}

exports.DeleteCategoryType = (req, res) => {
    const CategoryId = req.params.CategoryId;
    const query = {CategoryID: CategoryId }
    CategoryModel.deleteOne(query, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
}

