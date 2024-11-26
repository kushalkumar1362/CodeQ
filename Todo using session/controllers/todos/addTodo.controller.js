const { readData, writeData } = require("../../modules/fileHandling.module");

exports.addTodo = async (req, res) => {
  const { todo } = req.body;
  const user = req.user.email;

  if (!todo) {
    return res.status(400).json({
      success: false,
      message: "Please provide todo"
    });
  }
  try {
    const existingData = await readData("./todos.json");
    const userIndex = existingData.findIndex(item => item.user === user);

    const newTodo = { id: Date.now(), todo, isCompleted: false };

    if (userIndex === -1) {
      await writeData("./todos.json", [...existingData, { user, todos: [newTodo] }]);
    } else {
      existingData[userIndex].todos.push(newTodo);
      await writeData("./todos.json", existingData);
    }

    return res.json({
      success: true,
      message: 'Data saved successfully',
      data: newTodo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while saving data',
      error: error.message
    });
  }
}

