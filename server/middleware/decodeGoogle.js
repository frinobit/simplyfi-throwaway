const admin = require("../config/firebaseAdmin");

const decodeGoogle = async (req, res, next) => {
  const oldTokenObject = JSON.parse(req.body.old_token);
  const old_token = oldTokenObject.token;

  if (!old_token) {
    return res.status(401).json({ error: "Old token required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(old_token);
    const { user_id } = decodedToken;

    req.old_uid = user_id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = decodeGoogle;
