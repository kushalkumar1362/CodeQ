const multer = require('multer');
const path = require('path');

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set destination for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Determine filename for uploaded files
  filename: function (req, file, cb) {
    // Append current timestamp to original file name to ensure uniqueness
    cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create an instance of multer with the defined storage settings
const upload = multer({ storage: storage });

// Export the upload module for use in other parts of the application
module.exports = upload;
