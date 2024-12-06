/**
 * File upload route
 */
const express = require("express");
const router = express.Router();;

const { addToCart, removeFromCart, updateQuantity } = require("../../controllers/Product/cart.controller");

const { authMiddleware, isBuyer } = require("../../middlewares/auth.middleware");

router.post("/add-to-cart", authMiddleware, isBuyer, addToCart);
router.post("/remove-from-cart", authMiddleware, isBuyer, removeFromCart);
router.put("/update-cart-quantity", authMiddleware, isBuyer, updateQuantity);

module.exports = router;


