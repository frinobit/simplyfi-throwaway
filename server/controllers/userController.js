const User = require("../models/userModel");
const UserGuest = require("../models/userGuestModel");

const {
  createUserAndInitializeDatabase,
  createUserAndUpdateDatabase,
} = require("./userControllerSupport");

// signup user
const signupUser = async (req, res) => {
  const { uid, email, token } = req.body;

  try {
    // Initialize database
    const result = await createUserAndInitializeDatabase(uid, email, token);

    if (result === true) {
      console.log("signup user (email) successful.");
    } else {
      console.error("Initialization failed.");
    }

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, token } = req.body;

  try {
    console.log("login user (email) successful.");
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user as guest
const loginUserGuest = async (req, res) => {
  const { uid, email, token } = req.body;

  try {
    // Check if user guest already in database
    const userGuest = await UserGuest.findOne({ user_id: uid });

    if (!userGuest) {
      // Initialize database
      const result = await createUserAndInitializeDatabase(uid, email, token);

      if (result === true) {
        console.log("login user guest (email) successful.");
      } else {
        console.error("Initialization failed.");
      }
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user guest
const signupUserGuest = async (req, res) => {
  const { old_uid, new_uid, email, token } = req.body;

  try {
    // Update database
    const result = await createUserAndUpdateDatabase(old_uid, new_uid, email);

    if (result === true) {
      console.log("signup user guest (email) successful.");
    } else {
      console.error("Initialization failed.");
    }

    // Delete user guest
    await UserGuest.deleteOne({ user_id: old_uid });

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user with google
const loginUserGoogle = async (req, res) => {
  const { uid, email, token } = req.body;

  try {
    const user = await User.findOne({ user_id: uid });

    // if user first time login
    if (!user) {
      // Initialize database
      const result = await createUserAndInitializeDatabase(uid, email, token);

      if (result === true) {
        console.log("signup user (google) successful.");
      } else {
        console.error("Initialization failed.");
        res.status(400).json({ error: error.message });
        return;
      }
    }

    console.log("login user (google) successful.");
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  loginUserGuest,
  signupUserGuest,
  loginUserGoogle,
};
