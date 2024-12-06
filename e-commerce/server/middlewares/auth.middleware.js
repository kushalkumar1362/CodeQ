const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.body.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is Missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const existingUser = await User.findById(req.userId);
      existingUser.isLoggedIn = false;
      await existingUser.save();
      res.clearCookie('token');
      return res.status(440).json({
        success: false,
        message: "Session Expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized Request",
    });
  }
};

exports.isBuyer = async (req, res, next) => {
  try {
    const role = req.role;
    if (role !== "buyer") {
      return res.status(401).json({
        success: false,
        message: 'This is a protected route for Sellers only',
      });
    }
    next();
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User role cannot be verified, please try again'
    })
  }
}

exports.isSeller = async (req, res, next) => {
  try {
    const role = req.role;
    if (role !== "seller") {
      return res.status(401).json({
        success: false,
        message: 'This is a protected route for Buyers only',
      });
    }
    next();
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User role cannot be verified, please try again'
    })
  }
}


