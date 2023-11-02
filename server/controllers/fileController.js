const File = require("../models/fileModel");

// get all files
const getFiles = async (req, res) => {
  const user_id = req.user.user_id;

  const files = await File.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(files);
};

// upload a file
const uploadFile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { originalname, path } = req.file;

    const file = await File.create({
      user_id: user_id,
      filename: originalname,
      path: path,
    });

    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFiles,
  uploadFile,
};
