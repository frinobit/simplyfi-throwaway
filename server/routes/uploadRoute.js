const express = require("express");

// controller functions
const { uploadFile } = require("../controllers/uploadController");

// require auth for all message routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// POST a new file
router.post("/", uploadFile);

module.exports = router;
