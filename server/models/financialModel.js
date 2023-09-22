const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const financialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    assets: {
      type: Number,
      required: true,
    },
    liabilities: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Financial", financialSchema);
