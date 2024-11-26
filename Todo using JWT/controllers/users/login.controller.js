const { readData } = require("../../modules/fileHandling.module");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const usersData = await readData("./users.json");
    const user = usersData.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const options = {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      message: "User Login Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
};
