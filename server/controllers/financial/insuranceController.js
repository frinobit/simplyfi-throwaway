const Insurance = require("../../models/financial/insuranceModel");
const mongoose = require("mongoose");

// get all insurances
const getInsurances = async (req, res) => {
  const user_id = req.user.user_id;

  const insurances = await Insurance.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(insurances);
};

// get a single insurance
const getInsurance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such insurance" });
  }

  const insurance = await Insurance.findById(id);

  if (!insurance) {
    return res.status(404).json({ error: "No such insurance" });
  }

  res.status(200).json(insurance);
};

// create new insurance
const createInsurance = async (req, res) => {
  const { description, company, plan, type, sumassured, premium } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const insurance = await Insurance.create({
      description,
      company,
      plan,
      type,
      sumassured,
      premium,
      user_id,
    });

    res.status(200).json(insurance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a insurance
const deleteInsurance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such insurance" });
  }

  const insurance = await Insurance.findOneAndDelete({ _id: id });

  if (!insurance) {
    return res.status(404).json({ error: "No such insurance" });
  }

  res.status(200).json(insurance);
};

const updateInsurance = async (req, res) => {
  const { description, company, plan, type, sumassured, premium, user_id } =
    req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const updateData = {};

  if (company) {
    updateData.company = req.body.company;
  }
  if (plan) {
    updateData.plan = req.body.plan;
  }
  if (type) {
    updateData.type = req.body.type;
  }
  if (sumassured) {
    updateData.sumassured = req.body.sumassured;
  }
  if (premium) {
    updateData.premium = req.body.premium;
  }

  const filter = { description: description, user_id: user_id };

  const insurance = await Insurance.findOneAndUpdate(filter, updateData);

  if (!insurance) {
    return res.status(404).json({ error: "No such insurance" });
  }

  res.status(200).json(insurance);
};

module.exports = {
  getInsurances,
  getInsurance,
  createInsurance,
  deleteInsurance,
  updateInsurance,
};
