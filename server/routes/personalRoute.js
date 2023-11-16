import express from "express";

// controller functions
import {
  getPersonals,
  getPersonal,
  createPersonal,
  deletePersonal,
  updatePersonal,
} from "../controllers/personalController.js";

// require auth for all personal routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all personals
router.get("/", getPersonals);

// GET a single personal
router.get("/:id", getPersonal);

// POST a new personal
router.post("/", createPersonal);

// DELETE a personal
router.delete("/:id", deletePersonal);

// UPDATE a personal
router.patch("/", updatePersonal);
