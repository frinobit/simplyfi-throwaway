const express = require("express");

// controller functions
const {
  getSavings,
  getSaving,
  createSaving,
  deleteSaving,
  updateSaving,
} = require("../../controllers/financial/savingController");

// require auth for all saving routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all savings
router.get("/", getSavings);

// GET a single saving
router.get("/:id", getSaving);

// POST a new saving
router.post("/", createSaving);

// DELETE a saving
router.delete("/:id", deleteSaving);

// UPDATE a saving
router.patch("/:id", updateSaving);

module.exports = router;
