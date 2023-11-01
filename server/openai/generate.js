const openaiClient = require("./openai");
const path = require("path");
const pdfParse = require("pdf-parse");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");

const generate = async (queryDescription) => {
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

    const docs = await vectorStore.similaritySearch(queryDescription);

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: queryDescription,
    });
    console.log(response.text);
    console.log(response.sourceDocuments[0].pageContent);
    return chunks;
  } catch (error) {
    console.log(error);
  }

  // const response = await openaiClient.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: queryDescription }],
  //   max_tokens: 100,
  //   temperature: 0,
  // });
  // console.log(response.choices[0].message.content);
  // return response.choices[0].message.content;
};

module.exports = generate;
