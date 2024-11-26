const { readData, writeData } = require("../../modules/fileHandling.module");

exports.logout = async (req, res) => {
  const user = req.user;

  try {
    const data = await readData("./sessionStorage.json");
    const filterData = data.filter(data => data.token !== user.token);

    await writeData("./sessionStorage.json", filterData);
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logout Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the todo',
      error: error.message
    });
  }
}
