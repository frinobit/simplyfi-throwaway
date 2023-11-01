const File = require("../models/fileModel");

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
  uploadFile,
};
