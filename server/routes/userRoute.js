const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  loginUserGuest,
  signupUserGuest,
  loginUserGoogle,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// login as guest route
router.post("/loginGuest", loginUserGuest);

// signup as guest route
router.post("/signupGuest", signupUserGuest);

// login with google route
router.post("/loginGoogle", loginUserGoogle);

module.exports = router;
