const Expense = require("../../models/financial/expenseModel");
const mongoose = require("mongoose");

// get all expenses
const getExpenses = async (req, res) => {
  const user_id = req.user.user_id;

  const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(expenses);
};

// get a single expense
const getExpense = async (req, res) => {
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
const createExpense = async (req, res) => {
  const { description, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const expense = await Expense.create({
      description,
      amount,
      user_id,
    });

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a expense
const deleteExpense = async (req, res) => {
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
const updateExpense = async (req, res) => {
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

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
