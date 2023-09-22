const express = require("express");
const {
  getFinancials,
  getFinancial,
  createFinancial,
  deleteFinancial,
  updateFinancial,
} = require("../controllers/financialController");

const router = express.Router();

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
