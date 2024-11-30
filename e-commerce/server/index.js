const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/db.config");
const routes = require("./routes");
const path = require('path');

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Set port number
 */
const PORT = process.env.PORT || 2003;

/**
 * Connect to MongoDB database
 */
database.connect();

/**
 * Middleware
 */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


/**
 * Routing
 */
routes(app);

/**
 * Welcome message
 */
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to E-Commerce Server",
  });
});

/**
 * Server connection
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

