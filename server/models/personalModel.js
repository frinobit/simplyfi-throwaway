const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dependantSchema = new Schema({
  name: String,
  relationship: String,
  date_of_birth: Date, // "YYYY-MM-DD"
  years_to_support: Number,
  remark: String,
});

const personalSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Mdm", "Ms", "Dr"],
    },
    name: String,
    date_of_birth: {
      type: Date, // "YYYY-MM-DD"
    },
    nationality: {
      type: String,
      enum: ["Singaporean", "Singaporean PR", "Others"],
    },
    other_nationality: String,
    nric: String,
    address: String,
    mobile: String,
    email: String,
    marital_status: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    highest_qualification: {
      type: String,
      enum: [
        "Primary",
        "Secondary",
        "N / O / A levels",
        "Diploma / Degree & Above",
      ],
    },
    income_range: {
      type: String,
      enum: [
        "Below $30,000",
        "$30,000 - $49,999",
        "$50,000 - $99,999",
        "$100,000 and above",
      ],
    },
    spoken_language: {
      type: [String],
      enum: ["English", "Mandarin", "Malay", "Tamil", "Others"],
    },
    other_spoken_language: [String],
    written_language: {
      type: [String],
      enum: ["English", "Mandarin", "Malay", "Tamil", "Others"],
    },
    other_written_language: [String],
    smoking: Boolean,
    pep: Boolean,
    employment_status: {
      type: String,
      enum: ["Full Time", "Part Time", "Self Employed", "Retired", "Others"],
    },
    other_employment_status: String,
    employer: String,
    dependants: [dependantSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personal", personalSchema);
