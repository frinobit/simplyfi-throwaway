import { Investment } from "../../models/financial/investmentModel.js";
import mongoose from "mongoose";

// get all investments
export const getInvestments = async (req, res) => {
  const user_id = req.user.user_id;

  const investments = await Investment.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(investments);
};

// get a single investment
export const getInvestment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such investment" });
  }

  const investment = await Investment.findById(id);

  if (!investment) {
    return res.status(404).json({ error: "No such investment" });
  }

  res.status(200).json(investment);
};

// create new investment
export const createInvestment = async (req, res) => {
  const { description, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const investment = await Investment.create({
      description,
      amount,
      user_id,
    });

    res.status(200).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a investment
export const deleteInvestment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such investment" });
  }

  const investment = await Investment.findOneAndDelete({ _id: id });

  if (!investment) {
    return res.status(404).json({ error: "No such investment" });
  }

  res.status(200).json(investment);
};

// update a investment
export const updateInvestment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such investment" });
  }

  const investment = await Investment.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!investment) {
    return res.status(404).json({ error: "No such investment" });
  }

  res.status(200).json(investment);
};
