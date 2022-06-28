const express = require('express');
const router = express.Router();
const AuthVerifyMiddleware = require("../Middleware/AuthVerifyMiddleware");
const UserController = require('../Controllers/UserController');
const BrandController = require("../Controllers/BrandController");
const CategoryController = require("../Controllers/CategoryController");
const CustomerController = require("../Controllers/CustomerController");
const SupplierController = require("../Controllers/SupplierController");
const ExpenseTypeController = require("../Controllers/ExpenseTypeController");
const ExpenseListController = require("../Controllers/ExpenseListController");
const ProductController = require("../Controllers/ProductController");
const PurchaseController = require("../Controllers/PurchaseController");
const SellController = require("../Controllers/SellController");
const ReturnController = require ("../Controllers/ReturnController");
const DashboardController = require("../Controllers/DashboardController")

//test route 
router.get("/", UserController.hello);

//user routes
router.post("/loginUser", UserController.LoginUser);
router.post("/addUser",UserController.AddUser);
router.get("/AllUser",AuthVerifyMiddleware, UserController.AllUsers)
router.post("/updateUser/:UserId",AuthVerifyMiddleware, UserController.Update)
router.delete("/deleteUser/:Userid",AuthVerifyMiddleware, UserController.DeleteUser)

//brand routes
router.post("/createBrand",AuthVerifyMiddleware, BrandController.CreateBrand);
router.get("/readBrands",AuthVerifyMiddleware, BrandController.readBrand);
router.post("/updateBrand/:brandId",AuthVerifyMiddleware, BrandController.updateBrand);
router.get("/deleteBrand/:brandId",AuthVerifyMiddleware, BrandController.deleteBrand);

//category routes
router.post("/CreateCategoryType",AuthVerifyMiddleware, CategoryController.CreateCategoryType);
router.get("/ReadCategoryType",AuthVerifyMiddleware, CategoryController.ReadCategoryType);
router.post("/UpdateCategoryType/:CategoryId",AuthVerifyMiddleware, CategoryController.UpdateCategoryType);
router.get("/DeleteCategoryType/:CategoryId",AuthVerifyMiddleware, CategoryController.DeleteCategoryType);
router.get("/ReadCategoryById/:CategoryID",AuthVerifyMiddleware, CategoryController.ReadCategoryById);


//customer routes
router.post("/CreateCustomer", AuthVerifyMiddleware, CustomerController.CreateCustomer)
router.get("/ReadCustomer", AuthVerifyMiddleware, CustomerController.ReadCustomer)
router.post("/UpdateCustomer/:CustomerID", AuthVerifyMiddleware, CustomerController.UpdateCustomer)
router.get("/DeleteCustomer/:CustomerID", AuthVerifyMiddleware, CustomerController.DeleteCustomer)
router.get("/readCustomer/:CustomerID", AuthVerifyMiddleware, CustomerController.ReadCustomerById)

//supplier controllers
router.post("/CreateSupplier", AuthVerifyMiddleware, SupplierController.CreateSupplier);
router.get("/ReadSupplier", AuthVerifyMiddleware, SupplierController.ReadSuppliers);
router.post("/UpdateSupplier/:SupplierID", AuthVerifyMiddleware, SupplierController.UpdateSupplier);
router.get("/DeleteSupplier/:SupplierID", AuthVerifyMiddleware, SupplierController.DeleteSupplier);
router.get("/ReadSupplierByID/:supplierID", AuthVerifyMiddleware, SupplierController.ReadSupplierByID);

//expense type routes
router.post("/CreateExpenseType", AuthVerifyMiddleware, ExpenseTypeController.CreateExpenseType);
router.get("/ReadExpenseType", AuthVerifyMiddleware, ExpenseTypeController.ReadExpenseType);
router.post("/UpdateExpenseType/:TypeID", AuthVerifyMiddleware, ExpenseTypeController.UpdateExpenseType);
router.get("/DeleteExpenseType/:TypeID", AuthVerifyMiddleware, ExpenseTypeController.DeleteExpenseType);

//expense List
router.post("/CreateExpenseList", AuthVerifyMiddleware, ExpenseListController.CreateExpenseList);
router.get("/ReadExpenseList", AuthVerifyMiddleware, ExpenseListController.ReadExpenseList);
router.post("/UpdateExpenseList/:ExpenseID", AuthVerifyMiddleware, ExpenseListController.UpdateExpenseList);
router.get("/DeleteExpenseList/:ExpenseID", AuthVerifyMiddleware, ExpenseListController.DeleteExpenseList);
router.get("/readExpenseById/:ExpenseID", AuthVerifyMiddleware, ExpenseListController.readExpenseById);

//product routes
router.post("/CreateProduct", AuthVerifyMiddleware, ProductController.CreateProduct);
router.get("/ReadProduct", AuthVerifyMiddleware, ProductController.readProduct);
router.post("/UpdateProduct/:ProductID", AuthVerifyMiddleware, ProductController.updateProduct);
router.get("/DeleteProduct/:ProductID", AuthVerifyMiddleware, ProductController.deleteProduct);
router.get("/readProductById/:ProductID", AuthVerifyMiddleware, ProductController.readProductById);

//purchase routes
router.post("/CreartePurchase", AuthVerifyMiddleware, PurchaseController.CreartePurchase);
router.get("/ReadPurchase", AuthVerifyMiddleware, PurchaseController.ReadPurchase);
router.get("/DeletePurchase/:PurchaseID", AuthVerifyMiddleware, PurchaseController.DeletePurchase);
router.get("/ReadPurchaseProduct/:PurchaseID", AuthVerifyMiddleware, PurchaseController.ReadPurchaseProduct);

//sell last 8 routes are not check
router.post("/CrearteSell", AuthVerifyMiddleware, SellController.CreateSell);
router.get("/ReadSell", AuthVerifyMiddleware, SellController.ReadSell);
router.get("/DeleteSell/:SellID", AuthVerifyMiddleware, SellController.DeleteSell);
router.get("/ReadSellProducts/:SellID", AuthVerifyMiddleware, SellController.ReadSellProducts);

//return 
router.post("/CreateReturn", AuthVerifyMiddleware, ReturnController.CreateReturn);
router.get("/ReadReturn", AuthVerifyMiddleware, ReturnController.ReadReturn);
router.get("/DeleteReturn/:ReturnID", AuthVerifyMiddleware, ReturnController.DeleteReturn);
router.get("/ReadReturnProducts/:ReturnID", AuthVerifyMiddleware, ReturnController.ReadReturnProducts);

//dashboard
router.get("/TotalSell", AuthVerifyMiddleware, DashboardController.TotalSell);
router.get("/TotalPurchase", AuthVerifyMiddleware, DashboardController.TotalPurchase);
router.get("/TotalExpense", AuthVerifyMiddleware, DashboardController.TotalExpense);
router.get("/TotalReturn", AuthVerifyMiddleware, DashboardController.TotalReturn);

module.exports = router;