import mongoose from "mongoose";

const { Schema } = mongoose;

const incomeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["Salary", "Bonuses", "Others"],
  },
  amount: Number,
});

export const Income = mongoose.model("Income", incomeSchema);
