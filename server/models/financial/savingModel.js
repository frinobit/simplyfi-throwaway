import mongoose from "mongoose";

const { Schema } = mongoose;

const savingSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["Long-Term", "Emergency Fund", "Short-Term"],
  },
  amount: Number,
});

export const Saving = mongoose.model("Saving", savingSchema);
