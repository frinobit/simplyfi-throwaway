const express = require("express");

// controller functions
const {
  getInvestments,
  getInvestment,
  createInvestment,
  deleteInvestment,
  updateInvestment,
} = require("../../controllers/financial/investmentController");

// require auth for all investment routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all investments
router.get("/", getInvestments);

// GET a single investment
router.get("/:id", getInvestment);

// POST a new investment
router.post("/", createInvestment);

// DELETE a investment
router.delete("/:id", deleteInvestment);

// UPDATE a investment
router.patch("/:id", updateInvestment);

module.exports = router;
