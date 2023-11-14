import mongoose from "mongoose";

const { Schema } = mongoose;

const liabilitySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  amount: Number,
});

export const Liability = mongoose.model("Liability", liabilitySchema);
