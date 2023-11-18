import express from "express";

// controller functions
import {
  getCoverages,
  getCoverage,
  createCoverage,
  deleteCoverage,
  updateCoverage,
} from "../controllers/coverageController.js";

// require auth for all coverage routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all coverages
router.get("/", getCoverages);

// GET a single coverage
router.get("/:id", getCoverage);

// POST a new coverage
router.post("/", createCoverage);

// DELETE a coverage
router.delete("/:id", deleteCoverage);

// UPDATE a coverage
router.patch("/:id", updateCoverage);
