import { Router } from "express";
import { createUser, deleteUser, updateUser, getUser, getUsers } from "./controllers/userController";
import { createProduct, softDeleteProduct, updateProduct, getProduct, getProducts } from "./controllers/productController";
import { createSale, deleteSale, updateSale, getSale, getSales } from "./controllers/saleController";
import { createItemSale, getItensSale } from "./controllers/itemSaleController";
import { login, requestResetPasswordController, resetPasswordController } from "./controllers/authController";
import { ensureAuthenticaded, ensureAdmin } from "./middlewares/authMiddleware";

const router = Router()

//Login
router.post("/login", login)

//User
router.post("/user", ensureAuthenticaded, ensureAdmin, createUser)
router.put("/user", ensureAuthenticaded, updateUser)
router.delete("/user/:user_id", ensureAuthenticaded, deleteUser)
router.get("/user/:user_id", getUser)
router.get("/user", getUsers)


//Product
router.post("/product", ensureAuthenticaded, createProduct)
router.put("/product", ensureAuthenticaded, updateProduct)
router.put("/product/delete/:pr_id", ensureAuthenticaded, softDeleteProduct)
router.get("/product/:pr_id", getProduct)
router.get("/product/user/:user_id", getProducts)


//Sale
router.post("/sale", ensureAuthenticaded, createSale)
router.put("/sale", ensureAuthenticaded, updateSale)
router.put("/sale/delete/:sl_id", ensureAuthenticaded, deleteSale)
router.get("/sale/:sl_id", getSale)
router.get("/sale/user/:user_id", getSales)

//ItemSale
router.post("/itemSale", createItemSale)
router.get("/itemSale/:sl_id", getItensSale)


//RESET-PASSWORD
router.post("/request-reset-password", requestResetPasswordController);
router.post("/reset-password", resetPasswordController);    



export default router;