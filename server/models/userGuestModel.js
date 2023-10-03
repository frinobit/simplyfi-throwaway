const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userGuestSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserGuest", userGuestSchema);
