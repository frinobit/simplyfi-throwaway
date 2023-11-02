const openai = require("./openai");
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
    console.time("embedding");

    const files = fs.readdirSync(directoryPath);
    const userFiles = files.filter(
      (file) => file.startsWith(`${user_id}`) && file.endsWith(".pdf")
    );

    let combinedText = "";

    if (userFiles.length === 0) {
      // If no PDF files are found, use the general ChatGPT
      const responseGeneral = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: queryDescription }],
        max_tokens: 100,
        temperature: 0,
      });
      const responseFinal =
        "ChatGPT (knowledge):\n\n" +
        "No PDF uploaded." +
        "\n\n" +
        "ChatGPT (general):\n\n" +
        responseGeneral.choices[0].message.content;
      return responseFinal;
    }

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
      source: "chunk " + index + 1,
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
    console.timeEnd("embedding");
    console.time("chatgpt (knowledge)");

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: queryDescription,
    });
    // console.log(response.text);
    const sourceDocuments = response.sourceDocuments;
    let sourceList = "Sources:\n";
    let sourceArray = [];
    for (const sourceDocument of sourceDocuments) {
      sourceList += sourceDocument.metadata.source + "\n";
      sourceArray.push(sourceDocument.pageContent);
    }
    console.timeEnd("chatgpt (knowledge)");
    console.time("chatgpt (general)");

    const responseGeneral = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: queryDescription }],
      max_tokens: 100,
      temperature: 0,
    });
    // console.log(responseGeneral.choices[0].message.content);

    const responseFinal =
      "ChatGPT (knowledge):\n\n" +
      response.text +
      "\n\n" +
      sourceList +
      "\n" +
      "ChatGPT (general):\n\n" +
      responseGeneral.choices[0].message.content;
    console.timeEnd("chatgpt (general)");
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
