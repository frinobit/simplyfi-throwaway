const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  loginUserGuest,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// login as guest route
router.post("/loginGuest", loginUserGuest);

module.exports = router;
