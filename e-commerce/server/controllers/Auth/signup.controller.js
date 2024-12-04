const User = require("../../models/user.model");
const Verification = require("../../models/verification.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/**
 * Function to send verification link to user's email
 * @function sendLink
 * @param {string} email - User's email address
 * @returns {object} - Verification link body
 */
const sendLink = async (email) => {
  try {
    // Generate a random token
    const token = crypto.randomBytes(32).toString("hex");

    // Create a new verification link
    const tokenPayload = { email, token };
    const tokenBody = await Verification.create(tokenPayload);

    // Return the verification link body
    return tokenBody;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

/**
 * Handles user signup
 * @function signup
 */
exports.signup = async (req, res) => {
  try {
    // Extract the request body
    const { email, password, confirmPassword, name, currentTab } = req.body;
    // Check if all fields are filled
    if ([name, email, password, confirmPassword].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    let role = currentTab === "Buyer" ? "buyer" : "seller";
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Check if user is already activated
      if (existingUser.active) {
        return res.status(400).json({
          success: false,
          message: "User already exists.",
        });
      }

      // Update the user's password and name
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.name = name;
      existingUser.role = role;
      await existingUser.save();
    } else {
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        role: role,
      });
      await newUser.save();
    }

    // Send the verification link
    const token = await sendLink(email);

    // Return the response
    return res.status(201).json({
      success: true,
      message: 'Verification email sent. Check your inbox',
      token: token.token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Handles user verification
 * @function verifyUser
 */
exports.verifyUser = async (req, res) => {
  try {
    // Extract the request body
    const { token } = req.body;

    // Find the verification link
    const tokenBody = await Verification.findOne({ token });
    if (!tokenBody) {
      return res.status(401).json({
        success: false,
        message: "Token is Expired.",
      });
    }

    // Find the user
    const user = await User.findOne({ email: tokenBody.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Activate the user
    user.active = true;
    await user.save();

    // Return the response
    return res.status(200).json({
      success: true,
      message: "Your email has been verified successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


