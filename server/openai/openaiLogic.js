const path = require("path");
const pdfParse = require("pdf-parse");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");

const processMessage = async (userMessage, user_id, authorization) => {
  const absolutePathToFile = path.join(__dirname, "../assets/inventories.pdf");

  try {
    // extract the text
    const data = await pdfParse(absolutePathToFile);
    const text = data.text;

    // split into chunks
    const textSplitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 1000,
      chunkOverlap: 200,
      lengthFunction: function (text) {
        return text.length;
      },
    });
    const chunks = await textSplitter.splitText(text);
    const chunksWithIDs = chunks.map((chunk, index) => ({
      id: index + 1,
      chunk,
    }));

    // create embeddings
    const embeddings = new OpenAIEmbeddings();
    const vectorStore = await FaissStore.fromTexts(
      chunks,
      chunksWithIDs,
      embeddings
    );

    const docs = await vectorStore.similaritySearch(userMessage);

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: userMessage,
    });
    // console.log(response.text);
    // console.log(response.sourceDocuments[0].pageContent);
    return response.text;
  } catch (error) {
    console.log(error);
  }
};

// Function to initiate a conversation
const startConversation = () => {
  return "Upload a PDF and ask me a question!";
};

module.exports = { processMessage, startConversation };
