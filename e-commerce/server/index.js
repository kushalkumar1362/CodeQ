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
const CLIENT_URL = process.env.CLIENT_URL;
app.use((req, res, next) => {
  // console.log(req.url, req.method);
  next();
})

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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

