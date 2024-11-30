/**
 * Mongoose model for the User document
 *
 * @typedef {Object} User
 * @property {string} email - The user's email address
 * @property {timestamp} {Date} createdAt - The date the user was created
 * @property {timestamp} {Date} updatedAt - The date the user was last updated
 */
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
