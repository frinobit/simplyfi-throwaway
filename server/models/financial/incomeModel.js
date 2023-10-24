const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Income", incomeSchema);
