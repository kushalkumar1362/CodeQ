const { readData, writeData } = require("../../modules/fileHandling.module");

exports.updateTodo = async (req, res) => {
  const todo = req.body;
  console.log(todo)
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

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User have no todos yet'
      });
    }
    const index = existingData[userIndex].todos.findIndex(
      (item) => item.id === Number(todo.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    existingData[userIndex].todos[index] = { ...existingData[userIndex].todos[index], ...todo };

    await writeData("./todos.json", existingData);
    return res.json({
      success: true,
      message: 'Data update successfully',
      data: existingData[userIndex].todos[index]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while saving data',
      error: error.message
    });
  }
}


