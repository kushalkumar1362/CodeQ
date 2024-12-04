const User = require("../../models/user.model");

exports.logout = async (req, res) => {
  try {
    const id = req.userId;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      });
    }

    existingUser.isLoggedIn = false;
    await existingUser.save();
    // Clear the token cookie
    res.clearCookie('token');
    // Return a success message
    return res.status(200).json({
      success: true,
      message: 'Logout Successfully'
    });
  } catch (error) {
    // Return an error message if something goes wrong
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the todo',
      error: error.message
    });
  }
}


