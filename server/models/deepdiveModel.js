const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deepdiveSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    is_user_message: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deepdive", deepdiveSchema);
