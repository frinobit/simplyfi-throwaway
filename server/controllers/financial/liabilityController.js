import { Liability } from "../../models/financial/liabilityModel.js";
import mongoose from "mongoose";

// get all liabilities
export const getLiabilities = async (req, res) => {
  const user_id = req.user.user_id;

  const liabilities = await Liability.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(liabilities);
};

// get a single liability
export const getLiability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such liability" });
  }

  const liability = await Liability.findById(id);

  if (!liability) {
    return res.status(404).json({ error: "No such liability" });
  }

  res.status(200).json(liability);
};

// create new liability
export const createLiability = async (req, res) => {
  const { description, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const liability = await Liability.create({
      description,
      amount,
      user_id,
    });

    res.status(200).json(liability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a liability
export const deleteLiability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such liability" });
  }

  const liability = await Liability.findOneAndDelete({ _id: id });

  if (!liability) {
    return res.status(404).json({ error: "No such liability" });
  }

  res.status(200).json(liability);
};

// update a liability
export const updateLiability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such liability" });
  }

  const liability = await Liability.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!liability) {
    return res.status(404).json({ error: "No such liability" });
  }

  res.status(200).json(liability);
};
