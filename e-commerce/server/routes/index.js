// Import authentication routes
const authRoute = require("./Auth/auth.route");
const productRoute = require("./Product/product.route");


module.exports = (app) => {
  // Use authentication routes under the /api endpoint
  app.use("/api", authRoute);
  app.use("/api", productRoute);
};

