const OpenAIApi = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openaiAPIKey = process.env.OPENAI_API_KEY;

if (!openaiAPIKey) {
  console.error("OPENAI_API_KEY is not set");
  process.exit(1);
}

const openai = new OpenAIApi.OpenAI({ apiKey: openaiAPIKey });

module.exports = openai;
