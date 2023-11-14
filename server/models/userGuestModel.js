import mongoose from "mongoose";

const { Schema } = mongoose;

const userGuestSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
});

export const UserGuest = mongoose.model("UserGuest", userGuestSchema);
