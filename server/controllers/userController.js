const app = require("../firebase");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

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
    // console.log(idToken);

    // create User in database
    User.create({
      email: email,
      // password: password,
      user_id: user.uid,
    });

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

module.exports = { signupUser, loginUser };
