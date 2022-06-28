const ReturnModel = require("../Models/ReturnModel");
const ReturnProductModel = require("../Models/ReturnProductModel");

exports.CreateReturn = (req, res) => {
    const Return = {
        CustomerID: req.body.CustomerID,
        ReturnID: req.body.ReturnID,
        ReturnCharges: req.body.ReturnCharges,
        GrandTotal: req.body.GrandTotal,
        Note: req.body.Note
    }
    ReturnModel.create(Return, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            ReturnProductModel.insertMany(req.body.Products, (err2, data2) => {
                if (err) {
                    res.status(500).json({ "status": "fail", "data": err2 })
                } else {
                    res.status(200).json({ "status": "success", "data": data2 })
                }
            })
        }
    })
}

exports.ReadReturn = (req, res) => {
    ReturnModel.aggregate([
        { $lookup: { from: "customers", localField: "CustomerID", foreignField: "CustomerID", as: "customer" } },
        {
            $project: {
                _id: 0,
                CustomerID: 1,
                ReturnID: 1,
                ReturnCharges: 1,
                GrandTotal: 1,
                Note: 1,
                CreatedDate: 1,
                CustomerName: { $first: "$customer.CustomerName" },
                CustomerPhone: { $first: "$customer.Phone" },
                CustomerAddress: { $first: "$customer.Address" },
                CustomerCreatedDate: { $first: "$customer.CreatedDate" },
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.ReadReturnProducts = (req, res) => {
    const ReturnID = req.params.ReturnID;
    const query = { ReturnID: parseInt(ReturnID) };
    ReturnProductModel.aggregate([
        { $match: query },
        { $lookup: { from: "products", localField: "ProductID", foreignField: "ProductID", as: "products" } },
        { $unwind: "$products" },
        { $lookup: { from: "brands", localField: "products.BrandID", foreignField: "BrandID", as: "products.brands" } },
        { $lookup: { from: "categories", localField: "products.CategoryID", foreignField: "CategoryID", as: "products.categories" } },
        {
            $project: {
                _id: 0,
                ReturnID: 1,
                ProductID: 1,
                Qty: 1,
                Cost: 1,
                Total: 1,
                CreatedDate: 1,
                products: {
                    CategoryID: 1,
                    BrandID: 1,
                    Name: 1,
                    Price: 1,
                    Unit: 1,
                    Stock: 1,
                    Details: 1,
                },
                brandName: { $first: "$products.brands.Name" },
                categoyName: { $first: "$products.categories.Name" }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.DeleteReturn = (req, res) => {
    const ReturnID = req.params.ReturnID;
    const query = { ReturnID: parseInt(ReturnID) };
    ReturnModel.deleteOne(query, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            ReturnProductModel.deleteOne(query, (err2, data2) => {
                if (err) {
                    res.status(500).json({ "status": "fail", "data": err })
                } else {
                    res.status(200).json({ "status": "success", "data": data2 })
                }
            })
        }
    })
}