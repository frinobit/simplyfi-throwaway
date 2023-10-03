const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const User = require("../models/userModel");
const UserGuest = require("../models/userGuestModel");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { user_id } = decodedToken;

    // find in user
    req.user = await User.findOne({ user_id }).select("user_id");
    // find in user guest
    if (!req.user)
      req.user = await UserGuest.findOne({ user_id }).select("user_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// old
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET);
//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Request is not authorized" });
//   }
// };

module.exports = requireAuth;
