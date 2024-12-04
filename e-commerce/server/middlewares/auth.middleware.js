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
    req.userId = decoded.id;
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


