const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

exports.addToCart = async ({ userId, body: { productId, quantity } }, res) => {
  try {
    let [cart, product, user] = await Promise.all([
      Cart.findOne({ user_id: userId }).populate("products.product_id"),
      Product.findById(productId),
      User.findById(userId),
    ]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!cart) {
      cart = await new Cart({ user_id: userId }).save();
    }

    const existingProduct = cart.products.find(
      (product) => product.product_id.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      cart.products.push({ product_id: productId, quantity: Number(quantity) });
      user.carts.push({ product_id: productId, quantity: Number(quantity) });
    }

    await Promise.all([cart.save(), user.save()]);

    return res.status(200).json({
      success: true,
      message: 'Product added to cart'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal server error-->${error.message}`
    });
  }
}

exports.removeFromCart = async ({ userId, body: { productId } }, res) => {
  try {
    const [cart, user] = await Promise.all([
      Cart.findOne({ user_id: userId }),
      User.findById(userId)
    ]);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.products = cart.products.filter(({ product_id }) => product_id.toString() !== productId);
    user.carts = user.carts.filter(cartId => cartId.
      product_id.toString() !== productId);

    await Promise.all([cart.save(), user.save()]);

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, body: { productId, quantity } } = req;
    const [cart, user] = await Promise.all([
      Cart.findOne({ user_id: userId }),
      User.findById(userId)
    ]);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const cartProduct = cart.products.find(({ product_id }) => product_id.toString() === productId);
    const userProduct = user.carts.find(({ product_id }) => product_id.toString() === productId);

    if (!cartProduct || !userProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const newQuantity = cartProduct.quantity + Number(quantity);
    cartProduct.quantity = newQuantity;
    userProduct.quantity = newQuantity;


    await Promise.all([cart.save(), user.save()]);

    return res.status(200).json({
      success: true,
      message: 'Product quantity updated'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}


// exports.getAllCartProductsID = async ({ userId }, res) => {
//   try {
//     const cart = await Cart.findOne({ user_id: userId });
//     if (!cart) return res.status(404).json({
//       success: false,
//       message: 'Cart not found'
//     });

//     return res.status(200).json({
//       success: true,
//       products: cart.products
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// }
