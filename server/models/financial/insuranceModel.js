import mongoose from "mongoose";

const { Schema } = mongoose;

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

export const Insurance = mongoose.model("Insurance", insuranceSchema);
