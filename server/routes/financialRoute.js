import express from "express";

// controller functions
import {
  getFinancials,
  getFinancial,
  createFinancial,
  deleteFinancial,
  updateFinancial,
} from "../controllers/financialController.js";

// require auth for all financial routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all financials
router.get("/", getFinancials);

// GET a single financial
router.get("/:id", getFinancial);

// POST a new financial
router.post("/", createFinancial);

// DELETE a financial
router.delete("/:id", deleteFinancial);

// UPDATE a financial
router.patch("/:id", updateFinancial);
