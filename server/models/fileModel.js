import mongoose from "mongoose";

const { Schema } = mongoose;

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

export const File = mongoose.model("File", fileSchema);
