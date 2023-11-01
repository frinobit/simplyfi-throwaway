const express = require("express");

// controller functions
const {
  getDeepdives,
  getDeepdive,
  createDeepdive,
  deleteDeepdive,
  updateDeepdive,
} = require("../controllers/deepdiveController");

// require auth for all deepdive routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all deepdives
router.get("/", getDeepdives);

// GET a single deepdive
router.get("/:id", getDeepdive);

// POST a new deepdive
router.post("/", createDeepdive);

// DELETE a deepdive
router.delete("/:id", deleteDeepdive);

// UPDATE a deepdive
router.patch("/:id", updateDeepdive);

module.exports = router;
