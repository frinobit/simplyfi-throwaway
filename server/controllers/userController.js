import { admin } from "../config/firebaseAdmin.js";

import { User } from "../models/userModel.js";
import { UserGuest } from "../models/userGuestModel.js";

import {
  createUserAndInitializeDatabase,
  createUserAndUpdateDatabase,
} from "./userControllerSupport.js";

// signup user with email
export const signupUser = async (req, res) => {
  const { uid, email, token } = req.body;

  try {
    // Initialize database
    const result = await createUserAndInitializeDatabase(uid, email, token);

    if (result === true) {
      console.log("signup user (email) successful.");
    } else {
      console.error("Initialization failed.");
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user with email
export const loginUser = async (req, res) => {
  const { email, token } = req.body;

  try {
    console.log("login user (email) successful.");
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user as guest
export const loginUserGuest = async (req, res) => {
  const { uid, email, token } = req.body;

  try {
    // Check if user guest already in database
    const userGuest = await UserGuest.findOne({ user_id: uid });

    if (!userGuest) {
      // Initialize database
      const result = await createUserAndInitializeDatabase(uid, email, token);

      if (result === true) {
        console.log("login user guest successful.");
      } else {
        console.error("Initialization failed.");
        res.status(400).json({ error: error.message });
        return;
      }
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user guest with email
export const signupUserGuest = async (req, res) => {
  const { old_uid, new_uid, email, token } = req.body;

  try {
    // Update database
    const result = await createUserAndUpdateDatabase(old_uid, new_uid, email);

    if (result === true) {
      console.log("signup user guest (email / google) successful.");

      // Delete user guest
      await UserGuest.deleteOne({ user_id: old_uid });

      // Delete firebase guest account
      await admin.auth().deleteUser(old_uid);
      res.status(200).json({ email, token });
    } else {
      console.error("Initialization failed.");
      res.status(400).json({ error: error.message });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user guest with google
export const signupUserGuestGoogle = async (req, res) => {
  const old_uid = req.old_uid;
  const { new_uid, email, new_token } = req.body;

  try {
    // Update database
    const result = await createUserAndUpdateDatabase(old_uid, new_uid, email);

    if (result === true) {
      console.log("signup user guest (email / google) successful.");

      // Delete user guest
      await UserGuest.deleteOne({ user_id: old_uid });

      // Delete firebase guest account
      await admin.auth().deleteUser(old_uid);
      res.status(200).json({ email, token: new_token });
    } else {
      console.error("Initialization failed.");
      res.status(400).json({ error: error.message });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check if user exists (user sign up with google)
export const checkGoogle = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // check if user already exists
    if (user) {
      return res.status(400).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user with google
export const loginUserGoogle = async (req, res) => {
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
