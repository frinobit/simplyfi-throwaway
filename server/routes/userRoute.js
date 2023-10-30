const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  loginUserGuest,
  signupUserGuest,
  loginUserGoogle,
  checkGoogle,
} = require("../controllers/userController");

// require auth for all progressbar routes
const decodeGoogle = require("../middleware/decodeGoogle");

const router = express.Router();

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

// signup as guest route
router.post("/signupGuest", decodeGoogle, signupUserGuest);

module.exports = router;
