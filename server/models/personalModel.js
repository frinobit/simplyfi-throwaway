import mongoose from "mongoose";

const { Schema } = mongoose;

const personalSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    uinfin: { type: String, default: "" },
    name: { type: String, default: "" },
    sex: { type: String, default: "" },
    race: { type: String, default: "" },
    nationality: { type: String, default: "" },
    dob: { type: Date, default: "1970-01-01" }, // "YYYY-MM-DD"
    email: { type: String, default: "" },
    mobileno: { type: String, default: "" },
    regadd: { type: String, default: "" },
    housingtype: { type: String, default: "" },
    marital: { type: String, default: "" },
    edulevel: { type: String, default: "" },
    assessableincome: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Personal = mongoose.model("Personal", personalSchema);
