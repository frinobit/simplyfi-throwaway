import mongoose from "mongoose";

const { Schema } = mongoose;

const assetSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: String,
  amount: Number,
});

export const Asset = mongoose.model("Asset", assetSchema);
