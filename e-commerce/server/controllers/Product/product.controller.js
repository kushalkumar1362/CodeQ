const Product = require("../../models/product.model");
const path = require('path');

exports.addProduct = async (req, res) => {
  const id = req.userId;
  try {

    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const {
      product_name,
      product_description,
      product_price,
      product_quantity,
      product_category
    } = req.body;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded."
      });
    }

    const imagePaths = [];
    for (const file of files) {
      if (!fileTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Invalid file type. Only PNG, JPEG, and JPG files are allowed. You uploaded a ${file.mimetype}.`
        });
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);
      imagePaths.push(filePath);
    }

    const product = new Product({
      user_id: id,
      product_name,
      product_description,
      product_price,
      product_quantity,
      product_category,
      product_images: imagePaths,
    });

    await product.save();

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      product: product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.userId;
  try {

    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const {
      product_name,
      product_description,
      product_price,
      product_quantity,
      product_category,
      product_id
    } = req.body;

    if (!product_id || !product_name || !product_description || !product_price || !product_quantity || !product_category) {
      return res.status(400).json({
        success: false,
        message: "All Field is required."
      });
    }

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded."
      });
    }

    if (files.length >= 6) {
      return res.status(400).json({
        success: false,
        message: "You can upload max 5 file"
      });
    }

    const imagePaths = [];
    for (const file of files) {
      if (!fileTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Invalid file type. Only PNG, JPEG, and JPG files are allowed. You uploaded a ${file.mimetype}.`
        });
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);
      imagePaths.push(filePath);
    }

    const product = await Product.findByIdAndUpdate(
      product_id,
      {
        user_id: id,
        product_name,
        product_description,
        product_price,
        product_quantity,
        product_category,
        product_images: imagePaths,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Update Successfully.",
      product: product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getAllCartProductsById = async (req, res) => {
  try {
    const { carts } = req.query;

    const products = await Product.find({ _id: { $in: carts?.map(({ id }) => id) } });
    return res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

// exports.getProductById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

// exports.getProduct = async (req, res) => {
//   try {
//     const products = await Product.find({ user_id: req.userId });
//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
