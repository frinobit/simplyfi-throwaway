import express from "express";

// controller functions
import {
  loginUser,
  signupUser,
  loginUserGuest,
  signupUserGuest,
  signupUserGuestGoogle,
  loginUserGoogle,
  checkGoogle,
} from "../controllers/userController.js";

// decode middleware
import { decodeGoogle } from "../middleware/decodeGoogle.js";

export const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// login as guest route
router.post("/loginGuest", loginUserGuest);

// login with google route
router.post("/loginGoogle", loginUserGoogle);

// check if user exists (user sign up with google)
router.post("/checkGoogle", checkGoogle);

// signup user guest with email route
router.post("/signupGuest", signupUserGuest);

// signup user guest with google
router.post("/signupGuestGoogle", decodeGoogle, signupUserGuestGoogle);
