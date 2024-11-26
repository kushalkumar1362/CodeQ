const { readData, writeData } = require("../../modules/fileHandling.module");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password"
    });
  }

  try {
    const data = await readData("./users.json");
    const existingUser = data.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };
    await writeData("./users.json", [...data, newUser]);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating user",
      error: error.message
    });
  }
};
