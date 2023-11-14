import express from "express";

// controller functions
import {
  getDeepdives,
  getDeepdive,
  createDeepdive,
  deleteDeepdive,
  updateDeepdive,
} from "../controllers/deepdiveController.js";

// require auth for all deepdive routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all deepdives
router.get("/", getDeepdives);

// GET a single deepdive
router.get("/:id", getDeepdive);

// POST a new deepdive
router.post("/", createDeepdive);

// DELETE a deepdive
router.delete("/:id", deleteDeepdive);

// UPDATE a deepdive
router.patch("/:id", updateDeepdive);
