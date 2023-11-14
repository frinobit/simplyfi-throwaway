import express from "express";

// controller functions
import {
  getProgressBars,
  getProgressBar,
  createProgressBar,
  deleteProgressBar,
  updateProgressBar,
} from "../controllers/progressBarController.js";

// require auth for all progressbar routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all progressbars
router.get("/", getProgressBars);

// GET a single progressbar
router.get("/:id", getProgressBar);

// POST a new progressbar
router.post("/", createProgressBar);

// DELETE a progressbar
router.delete("/:id", deleteProgressBar);

// UPDATE a progressbar
router.patch("/", updateProgressBar);
