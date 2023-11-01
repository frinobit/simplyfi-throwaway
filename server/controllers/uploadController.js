const File = require("../models/fileModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const user_id = req.user.user_id;
      const { originalname, path } = req.file;
      console.log(originalname);
      console.log(path);

      const file = await File.create({
        user_id: user_id,
        filename: originalname,
        path: path,
      });

      res.status(200).json(file);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

module.exports = {
  uploadFile,
};
