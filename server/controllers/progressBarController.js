const ProgressBar = require("../models/progressBarModel");
const mongoose = require("mongoose");

// get all progressbars
const getProgressBars = async (req, res) => {
  const user_id = req.user.user_id;

  const progressbars = await ProgressBar.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(progressbars);
};

// get a single progressbar
const getProgressBar = async (req, res) => {
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
const createProgressBar = async (req, res) => {
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
const deleteProgressBar = async (req, res) => {
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
const updateProgressBar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  const progressbar = await ProgressBar.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!progressbar) {
    return res.status(404).json({ error: "No such progressbar" });
  }

  res.status(200).json(progressbar);
};

module.exports = {
  getProgressBars,
  getProgressBar,
  createProgressBar,
  deleteProgressBar,
  updateProgressBar,
};
