import { Expense } from "../../models/financial/expenseModel.js";
import mongoose from "mongoose";

// get all expenses
export const getExpenses = async (req, res) => {
  const user_id = req.user.user_id;

  const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(expenses);
};

// get a single expense
export const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await Expense.findById(id);

  if (!expense) {
    return res.status(404).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
};

// create new expense
export const createExpense = async (req, res) => {
  const { description, type, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const expense = await Expense.create({
      description,
      type,
      amount,
      user_id,
    });

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await Expense.findOneAndDelete({ _id: id });

  if (!expense) {
    return res.status(404).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
};

// update a expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await Expense.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!expense) {
    return res.status(404).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
};
