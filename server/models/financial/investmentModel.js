import mongoose from "mongoose";

const { Schema } = mongoose;

const investmentSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  amount: Number,
});

export const Investment = mongoose.model("Investment", investmentSchema);
