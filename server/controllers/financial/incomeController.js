import { Income } from "../../models/financial/incomeModel.js";
import mongoose from "mongoose";

// get all incomes
export const getIncomes = async (req, res) => {
  const user_id = req.user.user_id;

  const incomes = await Income.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(incomes);
};

// get a single income
export const getIncome = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such income" });
  }

  const income = await Income.findById(id);

  if (!income) {
    return res.status(404).json({ error: "No such income" });
  }

  res.status(200).json(income);
};

// create new income
export const createIncome = async (req, res) => {
  const { description, type, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const income = await Income.create({
      description,
      type,
      amount,
      user_id,
    });

    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a income
export const deleteIncome = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such income" });
  }

  const income = await Income.findOneAndDelete({ _id: id });

  if (!income) {
    return res.status(404).json({ error: "No such income" });
  }

  res.status(200).json(income);
};

// update a income
export const updateIncome = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such income" });
  }

  const income = await Income.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!income) {
    return res.status(404).json({ error: "No such income" });
  }

  res.status(200).json(income);
};
