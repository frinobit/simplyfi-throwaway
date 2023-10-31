import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openaiAPIKey = process.env.OPENAI_API_KEY;

if (!openaiAPIKey) {
  console.error("OPENAI_API_KEY is not set");
  process.exit(1);
}

const configuration = new Configuration({ apiKey: openaiAPIKey });
const openai = new OpenAIApi(configuration);

export default openai;
