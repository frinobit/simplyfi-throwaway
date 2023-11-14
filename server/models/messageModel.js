import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
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

export const Message = mongoose.model("Message", messageSchema);
