import { admin } from "../config/firebaseAdmin.js";
import { User } from "../models/userModel.js";
import { UserGuest } from "../models/userGuestModel.js";

export const requireAuth = async (req, res, next) => {
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
