import mongoose from "mongoose";

const { Schema } = mongoose;

const incomeSchema = new Schema({
  description: String,
  type: {
    type: String,
    enum: ["Salary", "Bonuses", "Others"],
  },
  amount: Number,
});

const expensesSchema = new Schema({
  description: String,
  type: {
    type: String,
    enum: ["Fixed", "Variables", "Annual"],
  },
  amount: Number,
});

const assetsSchema = new Schema({
  description: String,
  amount: Number,
});

const liabilitiesSchema = new Schema({
  description: String,
  amount: Number,
});

const savingsSchema = new Schema({
  description: String,
  type: {
    type: String,
    enum: ["Long-Term", "Emergency Fund", "Short-Term"],
  },
  amount: Number,
});

const financialSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    income: [incomeSchema],
    expenses: [expensesSchema],
    assets: [assetsSchema],
    liabilities: [liabilitiesSchema],
    savings: [savingsSchema],
  },
  { timestamps: true }
);

export const Financial = mongoose.model("Financial", financialSchema);
