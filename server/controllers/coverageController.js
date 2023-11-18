import { Coverage } from "../models/coverageModel.js";
import mongoose from "mongoose";

// get all coverages
export const getCoverages = async (req, res) => {
  const user_id = req.user.user_id;

  const coverages = await Coverage.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(coverages);
};

// get a single coverage
export const getCoverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such coverage" });
  }

  const coverage = await Coverage.findById(id);

  if (!coverage) {
    return res.status(404).json({ error: "No such coverage" });
  }

  res.status(200).json(coverage);
};

// create new coverage
export const createCoverage = async (req, res) => {
  const {
    label,
    premium,
    death,
    illness,
    disabilityP,
    disabilityT,
    medical,
    income,
    accident,
    care,
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const coverage = await Coverage.create({
      label,
      premium,
      death,
      illness,
      disabilityP,
      disabilityT,
      medical,
      income,
      accident,
      care,
      user_id,
    });

    res.status(200).json(coverage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a coverage
export const deleteCoverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such coverage" });
  }

  const coverage = await Coverage.findOneAndDelete({ _id: id });

  if (!coverage) {
    return res.status(404).json({ error: "No such coverage" });
  }

  res.status(200).json(coverage);
};

// update a coverage
export const updateCoverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such coverage" });
  }

  const coverage = await Coverage.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!coverage) {
    return res.status(404).json({ error: "No such coverage" });
  }

  res.status(200).json(coverage);
};
