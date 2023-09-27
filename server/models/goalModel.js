const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const allowedRiskTolerance = ["low", "medium", "high"];

function validateRiskTolerance(value) {
  return allowedRiskTolerance.includes(value);
}

const goalSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timeframe: {
      type: Number,
      required: true,
    },
    risk_tolerance: {
      type: String,
      required: true,
      validate: {
        validator: validateRiskTolerance,
        message: "Risk tolerance must be 'low', 'medium', or 'high'",
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
