const Asset = require("../../models/financial/assetModel");
const mongoose = require("mongoose");

// get all assets
const getAssets = async (req, res) => {
  const user_id = req.user.user_id;

  const assets = await Asset.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(assets);
};

// get a single asset
const getAsset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such asset" });
  }

  const asset = await Asset.findById(id);

  if (!asset) {
    return res.status(404).json({ error: "No such asset" });
  }

  res.status(200).json(asset);
};

// create new asset
const createAsset = async (req, res) => {
  const { description, amount } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const asset = await Asset.create({
      description,
      amount,
      user_id,
    });

    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a asset
const deleteAsset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such asset" });
  }

  const asset = await Asset.findOneAndDelete({ _id: id });

  if (!asset) {
    return res.status(404).json({ error: "No such asset" });
  }

  res.status(200).json(asset);
};

// update a asset
const updateAsset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such asset" });
  }

  const asset = await Asset.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!asset) {
    return res.status(404).json({ error: "No such asset" });
  }

  res.status(200).json(asset);
};

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  deleteAsset,
  updateAsset,
};
