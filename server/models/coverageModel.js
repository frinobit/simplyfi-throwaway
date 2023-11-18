import mongoose from "mongoose";

const { Schema } = mongoose;

const coverageSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  label: { type: String, default: "" },
  premium: { type: Number, default: 0 },
  death: { type: Number, default: 0 },
  illness: { type: Number, default: 0 },
  disabilityP: { type: Number, default: 0 },
  disabilityT: { type: Number, default: 0 },
  medical: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  accident: { type: Number, default: 0 },
  care: { type: Number, default: 0 },
});

export const Coverage = mongoose.model("Coverage", coverageSchema);
