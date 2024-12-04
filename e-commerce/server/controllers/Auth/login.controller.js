const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Find the user by email
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    // Check if user exists
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // Check if user is verified
    if (!existingUser.active) {
      return res.status(400).json({
        success: false,
        message: "User is not verified.",
      });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "password is incorrect.",
      });
    }


    existingUser.isLoggedIn = true;
    await existingUser.save();
    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Send response with token
    res.cookie("token", token, options).status(200).json({
      success: true,
      ...existingUser._doc,
      token,
      message: `User Login Success`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

