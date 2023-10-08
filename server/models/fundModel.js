const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fundAmountSchema = new Schema({
  annual_amount: {
    type: Number,
    default: 0,
  },
  single_amount: {
    type: Number,
    default: 0,
  },
});

const fundSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    cash: fundAmountSchema,
    cpf_ordinary: fundAmountSchema,
    cpf_special: fundAmountSchema,
    cpf_medisave: fundAmountSchema,
    srs: fundAmountSchema,
    total_annual: {
      type: Number,
      default: 0,
    },
    total_single: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fund", fundSchema);
