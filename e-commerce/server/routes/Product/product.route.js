const express = require("express");
const router = express.Router();
const upload = require('../../utils/uploads');

const { addProduct, getAllProducts, getAllCartProductsById, updateProduct } = require("../../controllers/Product/product.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");


router.post("/add-new-product", authMiddleware, upload.array('product_images', 5), addProduct);

router.post("/update-product", authMiddleware, upload.array('product_images', 5), updateProduct);

router.get("/get-all-product", getAllProducts);

router.get("/get-cart-product-by-ids", authMiddleware,
getAllCartProductsById);

module.exports = router;


