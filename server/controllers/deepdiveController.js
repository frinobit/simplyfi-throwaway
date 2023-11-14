import { Deepdive } from "../models/deepdiveModel.js";
import mongoose from "mongoose";

// get all deepdives
export const getDeepdives = async (req, res) => {
  const user_id = req.user.user_id;

  const deepdives = await Deepdive.find({ user_id }).sort({ createdAt: 1 });

  res.status(200).json(deepdives);
};

// get a single deepdive
export const getDeepdive = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  const deepdive = await Deepdive.findById(id);

  if (!deepdive) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  res.status(200).json(deepdive);
};

// create new deepdive
export const createDeepdive = async (req, res) => {
  const { content, is_user_deepdive } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const deepdive = await Deepdive.create({
      user_id,
      content,
      is_user_deepdive,
    });

    res.status(200).json(deepdive);
  } catch (error) {
    res.status(400).json({ error: error.deepdive });
  }
};

// delete a deepdive
export const deleteDeepdive = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  const deepdive = await Deepdive.findOneAndDelete({ _id: id });

  if (!deepdive) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  res.status(200).json(deepdive);
};

// update a deepdive
export const updateDeepdive = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  const deepdive = await Deepdive.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!deepdive) {
    return res.status(404).json({ error: "No such deepdive" });
  }

  res.status(200).json(deepdive);
};
