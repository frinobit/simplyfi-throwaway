const express = require("express");

// controller functions
const {
  getPersonals,
  getPersonal,
  createPersonal,
  deletePersonal,
  updatePersonal,
} = require("../controllers/personalController");

// require auth for all personal routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

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
router.patch("/:id", updatePersonal);

module.exports = router;
