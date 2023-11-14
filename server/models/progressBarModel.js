import mongoose from "mongoose";

const { Schema } = mongoose;

const progressBarSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  step1: { type: Number, default: 0 },
  step2: { type: Number, default: 0 },
  step3: { type: Number, default: 0 },
  step4: { type: Number, default: 0 },
  step5: { type: Number, default: 0 },
  step6: { type: Number, default: 0 },
  step7: { type: Number, default: 0 },
  step8: { type: Number, default: 0 },
  step9: { type: Number, default: 0 },
});

export const ProgressBar = mongoose.model("ProgressBar", progressBarSchema);
