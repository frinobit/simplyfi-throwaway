const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personalSchema = new Schema(
  {
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    ic_number: {
      type: String,
    },
    marital_status: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personal", personalSchema);
