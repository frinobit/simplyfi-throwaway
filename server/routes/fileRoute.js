import express from "express";

// controller functions
import {
  getFiles,
  getFile,
  updateFile,
  createFile,
  deleteFilePolicy,
  downloadFile,
  deleteFileSummary,
} from "../controllers/fileController.js";

// require auth for all message routes
import { requireAuth } from "../middleware/requireAuth.js";

// upload / delete middleware
import { fileUpload } from "../middleware/fileUpload.js";
import { fileDeletePolicy } from "../middleware/fileDeletePolicy.js";
import { fileDeleteSummary } from "../middleware/fileDeleteSummary.js";

export const router = express.Router();

router.use(requireAuth);

// GET all files
router.get("/", getFiles);

// GET a single file
router.get("/:id", getFile);

// UPDATE a file
router.patch("/:id", updateFile);

// user uploads a policy
router.post("/policy/upload", fileUpload, createFile);

// user deletes a policy
router.delete("/policy/:id", fileDeletePolicy, deleteFilePolicy);

// user downloads a summary
router.post("/summary/:id", downloadFile);

// user deletes a policy
router.delete("/summary/:id", fileDeleteSummary, deleteFileSummary);
