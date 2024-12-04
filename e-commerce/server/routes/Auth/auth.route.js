const express = require("express");
const router = express.Router();

/**
 * Import all authentication related controllers.
 */
const { login } = require("../../controllers/Auth/login.controller");
const { signup, verifyUser } = require("../../controllers/Auth/signup.controller");
const { logout } = require("../../controllers/Auth/logout.controller");

const {
  forgotPassword,
  updatePassword,
} = require("../../controllers/Auth/ResetPassword.controller")

/**
 * Import authentication middleware.
 */
const { authMiddleware } = require("../../middlewares/auth.middleware");

/**
 * Route for user login.
 */
router.post("/login", login);

/**
 * Route for user signup.
 */
router.post("/signup", signup);

/**
 * Route to verify user email.
 */
router.post("/verify", verifyUser);

/**
 * Route to logout a user.
 */
router.get("/logout", authMiddleware, logout);


// Route for generating a reset password token
router.post("/forgot-password", forgotPassword)

// Route for resetting user's password after verification
router.post("/update-password", updatePassword)

/**
 * Export the router module.
 */
module.exports = router;
