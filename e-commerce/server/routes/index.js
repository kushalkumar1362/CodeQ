// Import authentication routes
const authRoute = require("./Auth/auth.route");
const productRoute = require("./Product/product.route");
const cartRoute = require("./Product/cart.route");
const userRoute = require("./User/user.route");


module.exports = (app) => {
  // Use authentication routes under the /api endpoint
  app.use("/api", authRoute);
  app.use("/api", productRoute);
  app.use("/api", cartRoute);
  app.use("/api", cartRoute);
  app.use("/api", userRoute);
};

