const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    // create db with default
    const requestData = {
      name: "",
      contact: "",
      date_of_birth: "",
      ic_number: "",
      marital_status: "",
      user_id: user._id,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const apiUrl = `${process.env.BACKEND_URL}/api/personals`;
    axios.post(apiUrl, requestData, { headers });

    // success
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
