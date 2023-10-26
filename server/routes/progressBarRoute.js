const express = require("express");

// controller functions
const {
  getProgressBars,
  getProgressBar,
  createProgressBar,
  deleteProgressBar,
  updateProgressBar,
} = require("../controllers/progressBarController");

// require auth for all progressbar routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all progressbars
router.get("/", getProgressBars);

// GET a single progressbar
router.get("/:id", getProgressBar);

// POST a new progressbar
router.post("/", createProgressBar);

// DELETE a progressbar
router.delete("/:id", deleteProgressBar);

// UPDATE a progressbar
router.patch("/", updateProgressBar);

module.exports = router;
