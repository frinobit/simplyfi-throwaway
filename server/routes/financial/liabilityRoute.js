const express = require("express");

// controller functions
const {
  getLiabilities,
  getLiability,
  createLiability,
  deleteLiability,
  updateLiability,
} = require("../../controllers/financial/liabilityController");

// require auth for all liability routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

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

module.exports = router;
