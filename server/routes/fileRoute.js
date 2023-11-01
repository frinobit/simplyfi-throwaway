const express = require("express");

// controller functions
const { uploadFile } = require("../controllers/fileController");

// require auth for all message routes
const requireAuth = require("../middleware/requireAuth");

// upload middleware
const fileUpload = require("../middleware/fileUpload");

const router = express.Router();

router.use(requireAuth);

// POST a new file
router.post("/upload", fileUpload, uploadFile);

module.exports = router;
