import { Personal } from "../models/personalModel.js";
import mongoose from "mongoose";

// get all personals
export const getPersonals = async (req, res) => {
  const user_id = req.user.user_id;

  const personals = await Personal.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(personals);
};

// get a single personal
export const getPersonal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such personal" });
  }

  const personal = await Personal.findById(id);

  if (!personal) {
    return res.status(404).json({ error: "No such personal" });
  }

  res.status(200).json(personal);
};

// create new personal
export const createPersonal = async (req, res) => {
  const { name, contact, date_of_birth, ic_number, marital_status } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const personal = await Personal.create({
      name,
      contact,
      date_of_birth,
      ic_number,
      marital_status,
      user_id,
    });

    res.status(200).json(personal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a personal
export const deletePersonal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such personal" });
  }

  const personal = await Personal.findOneAndDelete({ _id: id });

  if (!personal) {
    return res.status(404).json({ error: "No such personal" });
  }

  res.status(200).json(personal);
};

// update a personal
export const updatePersonal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such personal" });
  }

  const personal = await Personal.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!personal) {
    return res.status(404).json({ error: "No such personal" });
  }

  res.status(200).json(personal);
};
