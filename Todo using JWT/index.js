const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
// const cors = require("cors");
const dotenv = require("dotenv");
const todoRouter = require("./routes/todo.route");
const userRouter = require("./routes/user.route");

dotenv.config();

const PORT = process.env.PORT || 2003;

/* Middlewares */
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:5500",
//   credentials: true,
// }));

app.use(express.static('Frontend'));
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/v1/users", userRouter);
app.use("/v1/todo", todoRouter);

/* Default Route */
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

