const User = require("../../models/user.model");

exports.getUser = async ({ userId }, res) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist."
      });
    }

    res.status(200).json({
      success: true,
      ...user._doc,
      message: "User Details Fetch Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

