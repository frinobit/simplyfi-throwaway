const Financial = require("../models/financialModel");
const mongoose = require("mongoose");

// get all financials
const getFinancials = async (req, res) => {
  // const user_id = req.user._id;
  const user_id = req.user.user_id;

  const financials = await Financial.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(financials);
};

// get a single financial
const getFinancial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such financial" });
  }

  const financial = await Financial.findById(id);

  if (!financial) {
    return res.status(404).json({ error: "No such financial" });
  }

  res.status(200).json(financial);
};

// create new financial
const createFinancial = async (req, res) => {
  const { name, income, expenses, assets, liabilities } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!income) {
    emptyFields.push("income");
  }
  if (!expenses) {
    emptyFields.push("expenses");
  }
  if (!assets) {
    emptyFields.push("assets");
  }
  if (!liabilities) {
    emptyFields.push("liabilities");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    // const user_id = req.user._id;
    const user_id = req.user.user_id;
    const financial = await Financial.create({
      name,
      income,
      expenses,
      assets,
      liabilities,
      user_id,
    });
    res.status(200).json(financial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a financial
const deleteFinancial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such financial" });
  }

  const financial = await Financial.findOneAndDelete({ _id: id });

  if (!financial) {
    return res.status(404).json({ error: "No such financial" });
  }

  res.status(200).json(financial);
};

// update a financial
const updateFinancial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such financial" });
  }

  const financial = await Financial.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!financial) {
    return res.status(404).json({ error: "No such financial" });
  }

  res.status(200).json(financial);
};

module.exports = {
  getFinancials,
  getFinancial,
  createFinancial,
  deleteFinancial,
  updateFinancial,
};
