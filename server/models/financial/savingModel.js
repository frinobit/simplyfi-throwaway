const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Saving", savingSchema);
