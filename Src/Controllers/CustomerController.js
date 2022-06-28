const CustomerModel = require("../Models/CustomerModel");
exports.CreateCustomer = (req, res) => {
    CustomerModel.create(req.body, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
}
exports.ReadCustomer = (req, res) => {
    CustomerModel.aggregate([
        { $lookup: { from: "sells", localField: "CustomerID", foreignField: "CustomerID", as: "sell" } },
        {
            $project: {
                _id: 0,
                CustomerName: 1,
                Phone: 1,
                Email: 1,
                Address: 1,
                CreatedDate: 1,
                CustomerID: 1,
                totalSpent: { $sum: "$sell.GrandTotal" }
            }
        }
    ], (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail","data":err})
        }
    })
}
exports.UpdateCustomer = (req, res) => {
    const CustomerID = req.params.CustomerID;
    CustomerModel.updateOne({ CustomerID: CustomerID }, req.body, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
}

exports.DeleteCustomer = (req, res) => {
    const CustomerID = req.params.CustomerID;
    CustomerModel.deleteOne({ CustomerID: CustomerID }, req.body, (err, data) => {
        if (!err) {
            res.status(200).json({ "status": "success", "data": data })
        } else {
            res.status(500).json({ "status": "fail", "data": err })
        }
    })
}

exports.ReadCustomerById=(req, res)=>{
    const customerId = req.params.CustomerID;
    CustomerModel.find({CustomerID:customerId}, (err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}

