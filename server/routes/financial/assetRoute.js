const express = require("express");

// controller functions
const {
  getAssets,
  getAsset,
  createAsset,
  deleteAsset,
  updateAsset,
} = require("../../controllers/financial/assetController");

// require auth for all asset routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

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

module.exports = router;
