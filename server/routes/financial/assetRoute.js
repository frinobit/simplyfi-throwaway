import express from "express";

// controller functions
import {
  getAssets,
  getAsset,
  createAsset,
  deleteAsset,
  updateAsset,
} from "../../controllers/financial/assetController.js";

// require auth for all asset routes
import { requireAuth } from "../../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// GET all assets
router.get("/", getAssets);

// GET a single asset
router.get("/:id", getAsset);

// POST a new asset
router.post("/", createAsset);

// DELETE a asset
router.delete("/:id", deleteAsset);

// UPDATE a asset
router.patch("/:id", updateAsset);
