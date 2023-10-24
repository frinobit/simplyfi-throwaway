const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  amount: Number,
});

module.exports = mongoose.model("Asset", assetSchema);
