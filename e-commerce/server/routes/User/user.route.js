const express = require("express");
const router = express.Router();

/**
 * Import all authentication related controllers.
 */
const { getUser } = require("../../controllers/User/getUser.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");

/**
 * Route to logout a user.
 */
router.get("/get-user", authMiddleware, getUser);

/**
 * Export the router module.
 */
module.exports = router;
