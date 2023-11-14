import express from "express";

// controller functions
import {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";

// require auth for all message routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

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
