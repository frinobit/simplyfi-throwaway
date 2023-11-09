const Deepdive = require("../models/deepdiveModel");

const store_message = async (user_id, content, is_user_message) => {
  const messageDocument = new Deepdive({
    user_id: user_id,
    content: content,
    is_user_message: is_user_message,
  });
  await messageDocument.save();
};

const path = require("path");
const fs = require("fs");
const { searchInQdrant, answerWithOpenAI } = require("./openaiUtils");

const processMessage = async (queryDescription, user_id) => {
  const directoryPath = path.join(__dirname, "../assets_policy");

  try {
    const files = fs.readdirSync(directoryPath);
    const userFiles = files
      .filter((file) => file.startsWith(`${user_id}`) && file.endsWith(".pdf"))
      .map((file) => path.basename(file));

    const relevantDocs = await searchInQdrant(queryDescription, userFiles[0]);
    const response = await answerWithOpenAI(relevantDocs, queryDescription);

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

// Function to initiate a conversation
const startConversation = () => {
  return "Upload a PDF and ask me a question!";
};

module.exports = { store_message, processMessage, startConversation };
