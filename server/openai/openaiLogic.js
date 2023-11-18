import { Deepdive } from "../models/deepdiveModel.js";

export const store_message = async (user_id, content, is_user_message) => {
  const messageDocument = new Deepdive({
    user_id: user_id,
    content: content,
    is_user_message: is_user_message,
  });
  await messageDocument.save();
};

import path, { dirname } from "path";
import fs from "fs";
import { searchInQdrant, answerWithOpenAI } from "./openaiUtils.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processMessage = async (queryDescription, user_id, fileName) => {
  const directoryPath = path.join(__dirname, "../assets_policy");

  try {
    const files = fs.readdirSync(directoryPath);
    const fullName = user_id + "_" + fileName;
    const relevantFile = files.find((file) => file === fullName);
    const relevantDocs = await searchInQdrant(queryDescription, relevantFile);
    const response = await answerWithOpenAI(relevantDocs, queryDescription);

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

// Function to initiate a conversation
export const startConversation = () => {
  return "Upload a PDF and ask me a question!";
};
