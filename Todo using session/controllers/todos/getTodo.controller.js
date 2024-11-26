const { readData } = require("../../modules/fileHandling.module");

exports.getTodo = async (req, res) => {
  const user = req.user.email;
  try {
    const data = await readData("./todos.json");
    const todos = data.find(({ user: u }) => u === user)?.todos || [];
    return res.json({
      success: true,
      message: todos.length ? "Data fetched successfully" : "User have no todos yet",
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching data",
      error: error.message,
    });
  }
};

