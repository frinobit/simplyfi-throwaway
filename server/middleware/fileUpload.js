const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../assets_policy"));
  },
  filename: (req, file, cb) => {
    const user_id = req.user.user_id;
    cb(null, user_id + "_" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload.single("pdf");
