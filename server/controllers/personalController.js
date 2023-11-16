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
  const {
    uinfin,
    name,
    sex,
    race,
    nationality,
    dob,
    email,
    mobileno,
    regadd,
    housingtype,
    marital,
    edulevel,
    assessableincome,
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const personal = await Personal.create({
      user_id,
      uinfin,
      name,
      sex,
      race,
      nationality,
      dob,
      email,
      mobileno,
      regadd,
      housingtype,
      marital,
      edulevel,
      assessableincome,
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
  let personal;
  const user_id = req.user.user_id;
  const personal_data = await Personal.findOne({ user_id });
  const personal_id = personal_data._id;
  personal = await Personal.findOneAndUpdate(
    { _id: personal_id },
    { ...req.body }
  );
  if (!personal) {
    return res.status(404).json({ error: "No such personal" });
  }

  res.status(200).json(personal);
};
