const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  description: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Financial", financialSchema);
