import express from "express";

// controller functions
import {
  getIncomes,
  getIncome,
  createIncome,
  deleteIncome,
  updateIncome,
} from "../../controllers/financial/incomeController.js";

// require auth for all income routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

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
