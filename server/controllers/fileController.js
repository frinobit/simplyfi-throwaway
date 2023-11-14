import { File } from "../models/fileModel.js";
import mongoose from "mongoose";

// get all files
export const getFiles = async (req, res) => {
  const user_id = req.user.user_id;

  const files = await File.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(files);
};

// get a single file
export const getFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such file" });
  }

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ error: "No such file" });
  }

  res.status(200).json(file);
};

// update a file
export const updateFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such file" });
  }

  const file = await File.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!file) {
    return res.status(404).json({ error: "No such file" });
  }

  res.status(200).json(file);
};

import {
  readDocs,
  countToken,
  splitText,
  storeInQdrant,
  deleteInQdrant,
} from "./fileControllerUtils.js";
// create new file
export const createFile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { originalname, path } = req.file;

    const file = await File.create({
      user_id: user_id,
      fileName: originalname,
      path: path,
      type: "policy",
    });

    const docs = await readDocs(path);
    const tokenCounts = countToken(docs);
    const chunks = await splitText(docs);
    const fullName = user_id + "_" + originalname;
    console.log("storing in qdrant database...");
    await storeInQdrant(fullName, tokenCounts, chunks);

    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a file
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOneAndDelete({ _id: id });

    const user_id = req.user.user_id;
    const { fileName } = req.body;

    const fullName = user_id + "_" + fileName;
    await deleteInQdrant(fullName);

    res.status(200).json(file);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

import path from "path";
import fs from "fs";
// download a single file
export const downloadFile = async (req, res) => {
  const user_id = req.user.user_id;
  const { fileName } = req.body;
  const fullName = user_id + "_" + fileName;
  const filePath = path.join(__dirname, "../assets_summary", fullName);

  const file = fs.createReadStream(filePath);
  file.pipe(res);
};
