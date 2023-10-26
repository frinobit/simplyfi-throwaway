const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  company: String,
  plan: String,
  type: String,
  sumassured: Number,
  premium: Number,
});

module.exports = mongoose.model("Insurance", insuranceSchema);
