const express = require('express');
const router = express.Router();

const { signup } = require("../controllers/users/signup.controller");
const { login } = require("../controllers/users/login.controller");
const { logout } = require("../controllers/users/logout.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);

module.exports = router;

