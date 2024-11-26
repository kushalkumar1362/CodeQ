const { readData, writeData } = require("../modules/fileHandling.module");

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.body.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is Missing",
    });
  }

  try {
    const data = await readData("./sessionStorage.json");
    const user = data.find(user => user.token === token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Request",
      });
    }

    if (new Date(user.expire_In) < Date.now()) {
      const filterData = data.filter(data => {
        return data.token !== token
      });
      await writeData("./sessionStorage.json", filterData);
      res.clearCookie('token');
      return res.status(440).json({
        success: false,
        message: "Session Expired",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data",
      error: error.message,
    });
  }
};

