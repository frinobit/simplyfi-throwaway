import express from "express";

// controller functions
import {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../../controllers/financial/expenseController.js";

// require auth for all expense routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

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
