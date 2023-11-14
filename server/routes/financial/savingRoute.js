import express from "express";

// controller functions
import {
  getSavings,
  getSaving,
  createSaving,
  deleteSaving,
  updateSaving,
} from "../../controllers/financial/savingController.js";

// require auth for all saving routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all savings
router.get("/", getSavings);

// GET a single saving
router.get("/:id", getSaving);

// POST a new saving
router.post("/", createSaving);

// DELETE a saving
router.delete("/:id", deleteSaving);

// UPDATE a saving
router.patch("/:id", updateSaving);
