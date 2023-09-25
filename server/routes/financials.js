const express = require("express");

// controller functions
const {
  getFinancials,
  getFinancial,
  createFinancial,
  deleteFinancial,
  updateFinancial,
} = require("../controllers/financialController");

// require auth for all financial routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all workouts
router.get("/", getFinancials);

// GET a single workout
router.get("/:id", getFinancial);

// POST a new workout
router.post("/", createFinancial);

// DELETE a workout
router.delete("/:id", deleteFinancial);

// UPDATE a workout
router.patch("/:id", updateFinancial);

module.exports = router;
