// READ DOCS
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const readDocs = async (path) => {
  try {
    const loader = new PDFLoader(path);
    const docs = await loader.load();

    const uniqueSources = new Set(docs.map((doc) => doc.metadata.source));
    console.log("Total number of PDF documents:", uniqueSources.size);

    console.log("Total pages (excluding blank page):", docs.length);
    console.log("Source:", docs[0].metadata.source);
    console.log("Location:", docs[0].metadata.loc);

    return docs;
  } catch (error) {
    console.log(error.message);
  }
};

const { getEncoding } = require("js-tiktoken");
const tokenizer = getEncoding("cl100k_base");
function tiktokenLen(text) {
  const tokens = tokenizer.encode(text);
  return tokens.length;
}

// COUNT TOKEN
const countToken = (docs) => {
  try {
    const tokenCounts = docs.map((doc) => tiktokenLen(doc.pageContent));

    const minCount = Math.min(...tokenCounts);
    const avgCount = Math.floor(
      tokenCounts.reduce((a, b) => a + b, 0) / tokenCounts.length
    );
    const maxCount = Math.max(...tokenCounts);
    console.log("Min:", minCount);
    console.log("Avg:", avgCount);
    console.log("Max:", maxCount);

    return tokenCounts;
  } catch (error) {
    console.log(error.message);
  }
};

// SPLIT TEXT
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const splitText = async (docs) => {
  try {
    const text_splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 400,
      chunkOverlap: 20,
      length_function: tiktokenLen,
      separators: ["\n\n", "\n", " ", ""],
    });

    const chunks = await text_splitter.splitDocuments(docs);
    console.log("Total chunks:", chunks.length);
    console.log("Source:", chunks[0].metadata.source);
    console.log("Location:", chunks[0].metadata.loc);

    return chunks;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  readDocs,
  countToken,
  splitText,
};
