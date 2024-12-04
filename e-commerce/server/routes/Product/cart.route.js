/**
 * File upload route
 */
const express = require("express");
const router = express.Router();;

const { addToCart, removeFromCart, updateQuantity } = require("../../controllers/Product/cart.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");

/**
 * Route to upload an Excel file
 * @param {string} excelFile - The uploaded Excel file
 */

router.post("/add-to-cart", authMiddleware, addToCart);
router.post("/remove-from-cart", authMiddleware, removeFromCart);
router.put("/update-cart-quantity", authMiddleware, updateQuantity);
// router.get("/get-all-cart-products", authMiddleware, getAllCartProductsID);
module.exports = router;


