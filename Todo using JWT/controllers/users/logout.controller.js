exports.logout = async (req, res) => {
  try {
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
