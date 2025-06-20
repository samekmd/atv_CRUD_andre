"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./controllers/userController");
const productController_1 = require("./controllers/productController");
const saleController_1 = require("./controllers/saleController");
const itemSaleController_1 = require("./controllers/itemSaleController");
const authController_1 = require("./controllers/authController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const router = (0, express_1.Router)();
//Login
router.post("/login", authController_1.login);
//User
router.post("/user", authMiddleware_1.ensureAuthenticaded, authMiddleware_1.ensureAdmin, userController_1.createUser);
router.put("/user", authMiddleware_1.ensureAuthenticaded, userController_1.updateUser);
router.delete("/user/:user_id", authMiddleware_1.ensureAuthenticaded, userController_1.deleteUser);
router.get("/user/:user_id", userController_1.getUser);
router.get("/user", userController_1.getUsers);
//Product
router.post("/product", authMiddleware_1.ensureAuthenticaded, productController_1.createProduct);
router.put("/product", authMiddleware_1.ensureAuthenticaded, productController_1.updateProduct);
router.put("/product/delete/:pr_id", authMiddleware_1.ensureAuthenticaded, productController_1.softDeleteProduct);
router.get("/product/:pr_id", productController_1.getProduct);
router.get("/product/user/:user_id", productController_1.getProducts);
//Sale
router.post("/sale", authMiddleware_1.ensureAuthenticaded, saleController_1.createSale);
router.put("/sale", authMiddleware_1.ensureAuthenticaded, saleController_1.updateSale);
router.put("/sale/delete/:sl_id", authMiddleware_1.ensureAuthenticaded, saleController_1.deleteSale);
router.get("/sale/:sl_id", saleController_1.getSale);
router.get("/sale/user/:user_id", saleController_1.getSales);
//ItemSale
router.post("/itemSale", itemSaleController_1.createItemSale);
router.get("/itemSale/:sl_id", itemSaleController_1.getItensSale);
exports.default = router;
