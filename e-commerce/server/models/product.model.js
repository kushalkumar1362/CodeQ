const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_name: {
      type: String,
      trim: true,
      required: true,
    },
    product_description: {
      type: String,
      trim: true,
      required: true,
    },
    product_price: {
      type: Number,
      trim: true,
      required: true,
    },
    product_images: [{
      type: String,
      trim: true,
      required: true,
    }],
    product_quantity: {
      type: Number,
      required: true,
    },
    product_category: {
      type: String,
      trim: true,
      required: true,
    },
    product_buyers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    }],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);

