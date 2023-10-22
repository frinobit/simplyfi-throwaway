const Message = require("../models/messageModel");
const mongoose = require("mongoose");

// get all messages
const getMessages = async (req, res) => {
  const user_id = req.user.user_id;

  const messages = await Message.find({ user_id }).sort({ createdAt: 1 });

  res.status(200).json(messages);
};

// get a single message
const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findById(id);

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }

  res.status(200).json(message);
};

// create new message
const createMessage = async (req, res) => {
  const { content, is_user_message } = req.body;

  // add doc to db
  try {
    const user_id = req.user.user_id;
    const message = await Message.create({
      user_id,
      content,
      is_user_message,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findOneAndDelete({ _id: id });

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }

  res.status(200).json(message);
};

// update a message
const updateMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }

  res.status(200).json(message);
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};
