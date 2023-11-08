const dotenv = require("dotenv");
dotenv.config();
const { QdrantVectorStore } = require("langchain/vectorstores/qdrant");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const searchInQdrant = async (queryDescription, userFile) => {
  try {
    console.time("SEARCH IN QDRANT");
    const embeddings = new OpenAIEmbeddings();
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName: userFile,
      }
    );
    console.log(queryDescription);
    const relevantDocs = await vectorStore.similaritySearch(
      queryDescription,
      4
    );
    console.log("Total relevant docs:", relevantDocs.length);
    console.log("Source:", relevantDocs[3].metadata.source);
    console.log("Page number:", relevantDocs[3].metadata.loc.pageNumber);
    console.log("Lines from:", relevantDocs[3].metadata.loc.lines.from);
    console.log("Lines to:", relevantDocs[3].metadata.loc.lines.to);
    console.timeEnd("SEARCH IN QDRANT");
    return relevantDocs;
  } catch (error) {
    console.log(error.message);
  }
};

const CustomHandler = require("./callback");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { loadQAStuffChain } = require("langchain/chains");
const answerWithOpenAI = async (relevantDocs, queryDescription) => {
  try {
    console.time("ANSWER WITH OPENAI");

    const handler = new CustomHandler();

    const model = new ChatOpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo-1106",
      callbacks: [handler],
      streaming: true,
    });

    const chain = loadQAStuffChain(model);

    const result = await chain.call({
      input_documents: relevantDocs,
      question: queryDescription,
    });

    console.timeEnd("ANSWER WITH OPENAI");
    return result.text;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { searchInQdrant, answerWithOpenAI };
