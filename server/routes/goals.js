const express = require("express");

// controller functions
const {
  getGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalController");

// require auth for all goal routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all goals
router.get("/", getGoals);

// GET a single goal
router.get("/:id", getGoal);

// POST a new goal
router.post("/", createGoal);

// DELETE a goal
router.delete("/:id", deleteGoal);

// UPDATE a goal
router.patch("/:id", updateGoal);

module.exports = router;
