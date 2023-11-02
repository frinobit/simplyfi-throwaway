const deleteFile = (req, res, next) => {
  const { filename } = req.body;
  const fs = require("fs");
  const path = require("path");
  const user_id = req.user.user_id;
  const filePath = path.join(__dirname, "../assets", `${user_id}_${filename}`);

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Handle error (file not found, permission issue, etc.)
      console.error("File not found:", err);
      res.status(404).send("File not found");
    } else {
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          // Handle error while deleting
          console.error("Error deleting file:", err);
          res.status(500).send("Error deleting file");
        } else {
          next();
        }
      });
    }
  });
};

module.exports = deleteFile;
