/**
 * Model for the verification link
 * @typedef {Object} VerificationLink
 * @property {string} email - The user's email address
 * @property {string} token - The verification token
 * @property {Date} createdAt - The date the verification link was created
 * @property {Date} expires - The date the verification link expires
 * @method pre - A pre-save hook that sends the verification email
 */

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.util");

const verificationLink = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, token) {
  try {
    const url = `${process.env.CLIENT_URL}/verify/${token}`;
    // const mailResponse =
    await mailSender(
      email,
      "E-Commerce - Verification Email",
      `<p>Please click the link below to verify your email address:</p>
      <p><a href="${url}">Click here</a></p>
      <p>If you did not request this email, please disregard it.</p>`
    );
    // console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

/**
 * A pre-save hook that sends the verification email
 * @function pre
 * @param {function} next - The next function to call
 * @private
 * @memberof VerificationLink
 */
verificationLink.pre("save", async function (next) {
  console.log("New document saved to database");

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.token);
  }
  next();
});


module.exports = mongoose.model("Verification", verificationLink);

