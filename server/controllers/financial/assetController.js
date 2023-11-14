import { Asset } from "../../models/financial/assetModel.js";
import mongoose from "mongoose";

// get all assets
export const getAssets = async (req, res) => {
  const user_id = req.user.user_id;

  const assets = await Asset.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(assets);
};

// get a single asset
export const getAsset = async (req, res) => {
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
export const createAsset = async (req, res) => {
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
export const deleteAsset = async (req, res) => {
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
export const updateAsset = async (req, res) => {
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
