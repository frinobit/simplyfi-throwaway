const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  loginUserGuest,
  signupUserGuest,
  signupUserGuestGoogle,
  loginUserGoogle,
  checkGoogle,
} = require("../controllers/userController");

// decode middleware
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

// signup user guest with email route
router.post("/signupGuest", signupUserGuest);

// signup user guest with google
router.post("/signupGuestGoogle", decodeGoogle, signupUserGuestGoogle);

module.exports = router;
