import { ProgressBar } from "../models/progressBarModel.js";
import mongoose from "mongoose";

// get all progressbars
export const getProgressBars = async (req, res) => {
  const user_id = req.user.user_id;

  const progressbars = await ProgressBar.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(progressbars);
};

// get a single progressbar
export const getProgressBar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  const progressbar = await ProgressBar.findById(id);

  if (!progressbar) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  res.status(200).json(progressbar);
};

// create new progressbar
export const createProgressBar = async (req, res) => {
  const { description, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const progressbar = await ProgressBar.create({
      description,
      amount,
      user_id,
    });

    res.status(200).json(progressbar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a progressbar
export const deleteProgressBar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  const progressbar = await ProgressBar.findOneAndDelete({ _id: id });

  if (!progressbar) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  res.status(200).json(progressbar);
};

// update a progressbar
export const updateProgressBar = async (req, res) => {
  const { step, user_id } = req.body;

  if (!step || step < 1 || step > 9) {
    return res.status(400).json({ error: "Invalid step" });
  }

  const updateData = { [`step${step}`]: 1 };
  const filter = { user_id: user_id };

  const progressbar = await ProgressBar.findOneAndUpdate(filter, updateData);

  if (!progressbar) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  res.status(200).json(progressbar);
};
