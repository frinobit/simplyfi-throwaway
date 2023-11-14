import express from "express";

// controller functions
import {
  getLiabilities,
  getLiability,
  createLiability,
  deleteLiability,
  updateLiability,
} from "../../controllers/financial/liabilityController.js";

// require auth for all liability routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all liabilities
router.get("/", getLiabilities);

// GET a single liability
router.get("/:id", getLiability);

// POST a new liability
router.post("/", createLiability);

// DELETE a liability
router.delete("/:id", deleteLiability);

// UPDATE a liability
router.patch("/:id", updateLiability);
