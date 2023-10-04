const app = require("../config/firebase-config");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
} = require("firebase/auth");

const User = require("../models/userModel");
const UserGuest = require("../models/userGuestModel");
const Financial = require("../models/financialModel");
const Goal = require("../models/goalModel");
const Personal = require("../models/personalModel");

const jwt = require("jsonwebtoken");
const axios = require("axios");

const admin = require("firebase-admin");

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(app);

  try {
    // firebase

    // create User in firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // create a token
    const token = await user.getIdToken();

    // create User in database
    User.create({
      email: email,
      // password: password,
      user_id: user.uid,
    });

    // create db with default
    const requestData = {
      name: "",
      contact: "",
      date_of_birth: "",
      ic_number: "",
      marital_status: "",
      user_id: user.uid,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const apiUrl = `${process.env.BACKEND_URL}/api/personals`;
    axios.post(apiUrl, requestData, { headers });

    // old
    //   const user = await User.signup(email, password);

    //   // create a token
    //   const token = createToken(user._id);

    //   // create db with default
    //   const requestData = {
    //     name: "",
    //     contact: "",
    //     date_of_birth: "",
    //     ic_number: "",
    //     marital_status: "",
    //     user_id: user._id,
    //   };
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    //   const apiUrl = `${process.env.BACKEND_URL}/api/personals`;
    //   axios.post(apiUrl, requestData, { headers });

    // success
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(app);

  try {
    // firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // create a token
    const token = await user.getIdToken();

    // // old
    // const user = await User.login(email, password);

    // // create a token
    // const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user as guest
const loginUserGuest = async (req, res) => {
  const auth = getAuth(app);

  try {
    // firebase

    // create User in firebase
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    // create a token
    const token = await user.getIdToken();

    // create User in database
    const userGuest = await UserGuest.findOne({ user_id: user.uid });
    if (!userGuest) {
      UserGuest.create({ user_id: user.uid });

      // create db with default
      const requestData = {
        name: "",
        contact: "",
        date_of_birth: "",
        ic_number: "",
        marital_status: "",
        user_id: user.uid,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const apiUrl = `${process.env.BACKEND_URL}/api/personals`;
      axios.post(apiUrl, requestData, { headers });
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user guest
const signupUserGuest = async (req, res) => {
  const { email, password, token: oldToken } = req.body;
  const auth = getAuth(app);

  try {
    const decodedToken = await admin.auth().verifyIdToken(oldToken);
    console.log(decodedToken);
    const { user_id: old_user_id } = decodedToken;
    console.log(old_user_id);

    // create new User in firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // create a token
    const token = await user.getIdToken();

    // create User in database
    User.create({
      email: email,
      // password: password,
      user_id: user.uid,
    });

    // update all db to new user_id
    const resultFinancial = await Financial.updateMany(
      { user_id: old_user_id },
      { $set: { user_id: user.uid } }
    );
    const resultGoal = await Goal.updateMany(
      { user_id: old_user_id },
      { $set: { user_id: user.uid } }
    );
    const resultPersonal = await Personal.updateMany(
      { user_id: old_user_id },
      { $set: { user_id: user.uid } }
    );

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, loginUserGuest, signupUserGuest };
