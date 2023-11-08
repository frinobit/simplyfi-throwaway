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

const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
// store file in qdrant
const storeFile = async (path) => {
  const loader = new PDFLoader(path);
  const docs = await loader.load();
  const uniqueSources = new Set(docs.map((doc) => doc.metadata.source));
  console.log("Total number of PDF documents:", uniqueSources.size);

  console.log("Total pages (excluding blank page):", docs.length);
  console.log("Source:", docs[50].metadata.source);
  console.log("Location:", docs[50].metadata.loc);
};

// create new file
const createFile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { originalname, path } = req.file;
    console.log(path);

    const file = await File.create({
      user_id: user_id,
      filename: originalname,
      path: path,
    });

    storeFile(path);

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
