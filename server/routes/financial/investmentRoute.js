import express from "express";

// controller functions
import {
  getInvestments,
  getInvestment,
  createInvestment,
  deleteInvestment,
  updateInvestment,
} from "../../controllers/financial/investmentController.js";

// require auth for all investment routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all investments
router.get("/", getInvestments);

// GET a single investment
router.get("/:id", getInvestment);

// POST a new investment
router.post("/", createInvestment);

// DELETE a investment
router.delete("/:id", deleteInvestment);

// UPDATE a investment
router.patch("/:id", updateInvestment);
