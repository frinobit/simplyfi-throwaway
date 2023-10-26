const express = require("express");

// controller functions
const {
  getFinancials,
  getFinancial,
  createFinancial,
  deleteFinancial,
  updateFinancial,
} = require("../controllers/financialController");

// require auth for all financial routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all financials
router.get("/", getFinancials);

// GET a single financial
router.get("/:id", getFinancial);

// POST a new financial
router.post("/", createFinancial);

// DELETE a financial
router.delete("/:id", deleteFinancial);

// UPDATE a financial
router.patch("/:id", updateFinancial);

module.exports = router;
