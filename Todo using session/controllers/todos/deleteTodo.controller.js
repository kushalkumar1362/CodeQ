const { readData, writeData } = require("../../modules/fileHandling.module");

exports.deleteTodo = async (req, res) => {
  const { id } = req.query;
  const user = req.user.email;

  try {
    const data = await readData("./todos.json");
    const userIndex = data.findIndex(item => item.user === user);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User Have no todos yet'
      });
    }

    const todos = data[userIndex].todos;
    const todoIndex = todos.findIndex(item => item.id === Number(id));

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todos.splice(todoIndex, 1);
    await writeData("./todos.json", data);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the todo',
      error: error.message
    });
  }
}

