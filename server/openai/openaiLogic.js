const path = require("path");
const fs = require("fs");
const { searchInQdrant, answerWithOpenAI } = require("./openaiUtils");

const processMessage = async (queryDescription, user_id, authorization) => {
  const directoryPath = path.join(__dirname, "../assets");

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

module.exports = { processMessage, startConversation };
