const express = require("express");

// controller functions
const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/messageController");

// require auth for all message routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all messages
router.get("/", getMessages);

// GET a single message
router.get("/:id", getMessage);

// POST a new message
router.post("/", createMessage);

// DELETE a message
router.delete("/:id", deleteMessage);

// UPDATE a message
router.patch("/:id", updateMessage);

module.exports = router;
