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
// user uploads a policy
export const createFile = async (req, res) => {
  try {
    // store in qdrant
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

// user deletes a policy
export const deleteFilePolicy = async (req, res) => {
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

import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// user downloads a summary
export const downloadFile = async (req, res) => {
  const user_id = req.user.user_id;
  const { fileName } = req.body;
  const fullName = user_id + "_" + fileName;
  const filePath = path.join(__dirname, "../assets_summary", fullName);

  const file = fs.createReadStream(filePath);
  file.pipe(res);
};

// user deletes a summary
export const deleteFileSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOneAndDelete({ _id: id });

    res.status(200).json(file);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

import { processMessage } from "../openai/openaiLogic.js";
import { Coverage } from "../models/coverageModel.js";
// user uploads a policy (life) and extract
export const extractFileLife = async (req, res) => {
  try {
    // store in qdrant
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

    // openai
    const questions = [
      "1. Label: ",
      "2. Premium: ",
      "3. Death: ",
      "4. Illness: ",
      "5. Disability (P): ",
      "6. Disability (T): ",
      "7. Medical: ",
      "8. Income: ",
      "9. Accident: ",
      "10. Care: ",
    ];
    const queryDescriptions = [
      "Plan Name: (Do not start the answer with 'The plan name is ...', give a concise answer)",
      'Premium Amount: (Enter premium amount as numbers only (no currency, no SGD, no $, no S$), reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Death Coverage Amount: (Enter death coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Illness Coverage Amount: (Enter illness coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Disability (P) Coverage Amount: (Enter disability (P) coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Disability (T) Coverage Amount: (Enter disability (T) coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Medical Coverage Amount: (Enter medical coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Income Coverage Amount: (Enter income coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Accident Coverage Amount: (Enter accident coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
      'Care Coverage Amount: (Enter care coverage amount as numbers only, reply "0" if not available). PLEASE REPLY with "0", NOT SOMETHING ELSE, I WANT "0" if you don\'t have this specific information available or not in given context!',
    ];
    let responses = [];
    for (let i = 0; i < questions.length; i++) {
      let response = await processMessage(
        queryDescriptions[i],
        user_id,
        originalname
      );
      responses.push(response);
    }
    console.log(responses);

    // update coverage db
    const coverageId = req.body.coverageId;
    console.log("Coverage ID:", coverageId);
    await Coverage.findByIdAndUpdate(
      { _id: coverageId },
      {
        type: "life",
        label: responses[0],
        premium: parseInt(responses[1]),
        death: parseInt(responses[2]),
        illness: parseInt(responses[3]),
        disabilityP: parseInt(responses[4]),
        disabilityT: parseInt(responses[5]),
        medical: parseInt(responses[6]),
        income: parseInt(responses[7]),
        accident: parseInt(responses[8]),
        care: parseInt(responses[9]),
      }
    );

    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
