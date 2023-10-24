const express = require("express");

// controller functions
const {
  getIncomes,
  getIncome,
  createIncome,
  deleteIncome,
  updateIncome,
} = require("../../controllers/financial/incomeController");

// require auth for all income routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all incomes
router.get("/", getIncomes);

// GET a single income
router.get("/:id", getIncome);

// POST a new income
router.post("/", createIncome);

// DELETE a income
router.delete("/:id", deleteIncome);

// UPDATE a income
router.patch("/:id", updateIncome);

module.exports = router;
