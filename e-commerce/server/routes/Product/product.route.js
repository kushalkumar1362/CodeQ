/**
 * File upload route
 */
const express = require("express");
const router = express.Router();
const upload = require('../../utils/uploads');

const { addProduct, getProduct, getAllProducts, getProductById } = require("../../controllers/Product/product.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");

/**
 * Route to upload an Excel file
 * @param {string} excelFile - The uploaded Excel file
 */
router.post("/add-product", authMiddleware, upload.array('product_images', 5), addProduct);
router.get("/get-product", authMiddleware, getProduct);
router.get("/get-all-product", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);

module.exports = router;


