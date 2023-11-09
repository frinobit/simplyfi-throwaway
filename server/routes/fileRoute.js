const express = require("express");

// controller functions
const {
  getFiles,
  getFile,
  updateFile,
  createFile,
  deleteFile,
  downloadFile,
} = require("../controllers/fileController");

// require auth for all message routes
const requireAuth = require("../middleware/requireAuth");

// upload / delete middleware
const fileUpload = require("../middleware/fileUpload");
const fileDelete = require("../middleware/fileDelete");

const router = express.Router();

router.use(requireAuth);

// GET all files
router.get("/", getFiles);

// GET a single file
router.get("/:id", getFile);

// UPDATE a file
router.patch("/:id", updateFile);

// user uploads a policy
router.post("/policy/upload", fileUpload, createFile);

// user deletes a policy
router.delete("/policy/:id", fileDelete, deleteFile);

// user downloads a summary
router.post("/summary/:id", downloadFile);

module.exports = router;
