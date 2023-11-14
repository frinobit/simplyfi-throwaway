import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["Fixed", "Variables", "Annual"],
  },
  amount: Number,
});

export const Expense = mongoose.model("Expense", expenseSchema);
