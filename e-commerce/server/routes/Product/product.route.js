/**
 * File upload route
 */
const express = require("express");
const router = express.Router();
const upload = require('../../utils/uploads');

const { addProduct, getAllProducts, getAllCartProductsById } = require("../../controllers/Product/product.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");

/**
 * Route to upload an Excel file
 * @param {string} excelFile - The uploaded Excel file
 */
router.post("/add-new-product", authMiddleware, upload.array('product_images', 5), addProduct);
router.get("/get-all-product", getAllProducts);
router.get("/get-cart-product-by-ids", authMiddleware, getAllCartProductsById);

module.exports = router;


