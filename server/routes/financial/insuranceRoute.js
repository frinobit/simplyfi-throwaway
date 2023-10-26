const express = require("express");

// controller functions
const {
  getInsurances,
  getInsurance,
  createInsurance,
  deleteInsurance,
  updateInsurance,
} = require("../../controllers/financial/insuranceController");

// require auth for all insurance routes
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all insurances
router.get("/", getInsurances);

// GET a single insurance
router.get("/:id", getInsurance);

// POST a new insurance
router.post("/", createInsurance);

// DELETE a insurance
router.delete("/:id", deleteInsurance);

// UPDATE a insurance
router.patch("/", updateInsurance);

module.exports = router;
