const { readData, writeData } = require("../../modules/fileHandling.module");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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

    const existingTokens = await readData("./sessionStorage.json");
    if (existingTokens.some(token => token.email === email)) {
      return res.status(409).json({
        success: false,
        message: "Session already exists",
      });
    }

    const token = crypto.randomBytes(64).toString("hex");
    const expireIn = Date.now() +  5 * 60 * 1000;

    const updatedTokens = [
      ...existingTokens,
      { token, email, expire_In: expireIn },
    ];

    await writeData("./sessionStorage.json", updatedTokens);

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
