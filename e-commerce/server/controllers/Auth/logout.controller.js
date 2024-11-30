exports.logout = async (req, res) => {
  try {
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


