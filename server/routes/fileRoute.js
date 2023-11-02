const express = require("express");

// controller functions
const {
  getFiles,
  getFile,
  createFile,
  deleteFile,
  updateFile,
} = require("../controllers/fileController");

// require auth for all message routes
const requireAuth = require("../middleware/requireAuth");

// upload middleware
const fileUpload = require("../middleware/fileUpload");

const router = express.Router();

router.use(requireAuth);

// GET all files
router.get("/", getFiles);

// GET a single file
router.get("/:id", getFile);

// POST a new file
router.post("/upload", fileUpload, createFile);

// DELETE a file
router.delete("/:id", deleteFile);

// UPDATE a file
router.patch("/:id", updateFile);

module.exports = router;
