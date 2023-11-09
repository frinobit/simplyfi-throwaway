const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["policy", "summary"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
