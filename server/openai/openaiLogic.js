const openaiClient = require("./openai");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");

const processMessage = async (queryDescription, user_id, authorization) => {
  const directoryPath = path.join(__dirname, "../assets");

  try {
    const files = fs.readdirSync(directoryPath);
    const userFiles = files.filter(
      (file) => file.startsWith(`${user_id}`) && file.endsWith(".pdf")
    );

    let combinedText = "";

    for (const userFile of userFiles) {
      const filePath = path.join(directoryPath, userFile);

      const data = await pdfParse(filePath);
      const text = data.text;

      combinedText += text + "\n";
    }

    // split into chunks
    const textSplitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 1000,
      chunkOverlap: 200,
      lengthFunction: function (text) {
        return text.length;
      },
    });
    const chunks = await textSplitter.splitText(combinedText);
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

    const docs = await vectorStore.similaritySearch(queryDescription);

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: queryDescription,
    });
    // console.log(response.text);
    // console.log(response.sourceDocuments[0].pageContent);

    const responseGeneral = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: queryDescription }],
      max_tokens: 100,
      temperature: 0,
    });
    // console.log(responseGeneral.choices[0].message.content);

    const responseFinal =
      "ChatGPT (with knowledge):\n\n" +
      response.text +
      "\n\n" +
      "ChatGPT (general):\n\n" +
      responseGeneral.choices[0].message.content;

    return responseFinal;
  } catch (error) {
    console.log(error);
  }
};

// Function to initiate a conversation
const startConversation = () => {
  return "Upload a PDF and ask me a question!";
};

module.exports = { processMessage, startConversation };
