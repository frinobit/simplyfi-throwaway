const express = require("express");

// controller functions
const {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
} = require("../../controllers/financial/expenseController");

// require auth for all expense routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all expenses
router.get("/", getExpenses);

// GET a single expense
router.get("/:id", getExpense);

// POST a new expense
router.post("/", createExpense);

// DELETE a expense
router.delete("/:id", deleteExpense);

// UPDATE a expense
router.patch("/:id", updateExpense);

module.exports = router;
