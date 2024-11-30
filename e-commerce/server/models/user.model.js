/**
 * Mongoose model for the User document
 *
 * @typedef {Object} User
 * @property {string} email - The user's email address
 * @property {string} password - The user's password
 * @property {string} name - The user's name
 * @property {string} [excelFile] - The path to the user's uploaded Excel file
 * @property {boolean} active - Whether the user account is active or not
 * @property {timestamp} {Date} createdAt - The date the user was created
 * @property {timestamp} {Date} updatedAt - The date the user was last updated
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
