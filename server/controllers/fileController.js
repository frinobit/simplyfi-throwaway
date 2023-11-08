const File = require("../models/fileModel");
const mongoose = require("mongoose");

// get all files
const getFiles = async (req, res) => {
  const user_id = req.user.user_id;

  const files = await File.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(files);
};

// get a single file
const getFile = async (req, res) => {
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

const { readDocs, countToken, splitText } = require("./fileControllerUtils");
// create new file
const createFile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { originalname, path } = req.file;

    const file = await File.create({
      user_id: user_id,
      filename: originalname,
      path: path,
    });

    const docs = await readDocs(path);
    const tokenCounts = countToken(docs);
    const chunks = splitText(docs);

    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such file" });
  }

  const file = await File.findOneAndDelete({ _id: id });

  if (!file) {
    return res.status(404).json({ error: "No such file" });
  }

  res.status(200).json(file);
};

// update a file
const updateFile = async (req, res) => {
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

module.exports = {
  getFiles,
  getFile,
  createFile,
  deleteFile,
  updateFile,
};
