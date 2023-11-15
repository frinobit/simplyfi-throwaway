import express from "express";

// controller functions
import {
  getEnv,
  generateCodeChallenge,
  getPersonData,
} from "../controllers/myinfoController.js";

export const router = express.Router();

router.get("/getEnv", getEnv);

router.post("/generateCodeChallenge", generateCodeChallenge);

router.post("/getPersonData", getPersonData);
