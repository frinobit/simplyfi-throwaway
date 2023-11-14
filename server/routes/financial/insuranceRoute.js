import express from "express";

// controller functions
import {
  getInsurances,
  getInsurance,
  createInsurance,
  deleteInsurance,
  updateInsurance,
} from "../../controllers/financial/insuranceController.js";

// require auth for all insurance routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all insurances
router.get("/", getInsurances);

// GET a single insurance
router.get("/:id", getInsurance);

// POST a new insurance
router.post("/", createInsurance);

// DELETE a insurance
router.delete("/:id", deleteInsurance);

// UPDATE a insurance
router.patch("/", updateInsurance);
