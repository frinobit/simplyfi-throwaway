import { Saving } from "../../models/financial/savingModel.js";
import mongoose from "mongoose";

// get all savings
export const getSavings = async (req, res) => {
  const user_id = req.user.user_id;

  const savings = await Saving.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(savings);
};

// get a single saving
export const getSaving = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such saving" });
  }

  const saving = await Saving.findById(id);

  if (!saving) {
    return res.status(404).json({ error: "No such saving" });
  }

  res.status(200).json(saving);
};

// create new saving
export const createSaving = async (req, res) => {
  const { description, type, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const saving = await Saving.create({
      description,
      type,
      amount,
      user_id,
    });

    res.status(200).json(saving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a saving
export const deleteSaving = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such saving" });
  }

  const saving = await Saving.findOneAndDelete({ _id: id });

  if (!saving) {
    return res.status(404).json({ error: "No such saving" });
  }

  res.status(200).json(saving);
};

// update a saving
export const updateSaving = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such saving" });
  }

  const saving = await Saving.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!saving) {
    return res.status(404).json({ error: "No such saving" });
  }

  res.status(200).json(saving);
};
