import dotenv from "dotenv";
dotenv.config();

// READ DOCS
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
export const readDocs = async (path) => {
  try {
    console.time("READ DOCS");
    const loader = new PDFLoader(path);
    const docs = await loader.load();

    const uniqueSources = new Set(docs.map((doc) => doc.metadata.source));
    console.log("Total number of PDF documents:", uniqueSources.size);

    console.log("Total pages (excluding blank page):", docs.length);
    console.log("Source:", docs[0].metadata.source);
    console.log("Location:", docs[0].metadata.loc);

    console.timeEnd("READ DOCS");
    console.log("--------------------------------------------------");
    return docs;
  } catch (error) {
    console.log(error.message);
  }
};

import { getEncoding } from "js-tiktoken";
const tokenizer = getEncoding("cl100k_base");
function tiktokenLen(text) {
  const tokens = tokenizer.encode(text);
  return tokens.length;
}

// COUNT TOKEN
export const countToken = (docs) => {
  try {
    console.time("COUNT TOKEN");
    const tokenCounts = docs.map((doc) => tiktokenLen(doc.pageContent));

    const minCount = Math.min(...tokenCounts);
    const avgCount = Math.floor(
      tokenCounts.reduce((a, b) => a + b, 0) / tokenCounts.length
    );
    const maxCount = Math.max(...tokenCounts);
    console.log("Min:", minCount);
    console.log("Avg:", avgCount);
    console.log("Max:", maxCount);

    console.timeEnd("COUNT TOKEN");
    console.log("--------------------------------------------------");
    return tokenCounts;
  } catch (error) {
    console.log(error.message);
  }
};

// SPLIT TEXT
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export const splitText = async (docs) => {
  try {
    console.time("SPLIT TEXT");
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

    console.timeEnd("SPLIT TEXT");
    console.log("--------------------------------------------------");
    return chunks;
  } catch (error) {
    console.log(error.message);
  }
};

// STORE IN QDRANT
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
export const storeInQdrant = async (fullName, tokenCounts, chunks) => {
  try {
    console.time("STORE IN QDRANT");
    const embeddings = new OpenAIEmbeddings();
    const collectionName = fullName;
    await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL,
      collectionName: collectionName,
    });

    const embeddingCost = 0.0001 / 1000;
    const totalTokens = tokenCounts.reduce((total, num) => total + num, 0);
    console.log("Embedding Tokens:", totalTokens);
    console.log("Prompt Costs: $", totalTokens * embeddingCost);
    console.timeEnd("STORE IN QDRANT");
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE IN QDRANT
import { QdrantClient } from "@qdrant/js-client-rest";
export const deleteInQdrant = async (fullName) => {
  try {
    console.time("DELETE IN QDRANT");
    dotenv.config();
    const client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    });
    await client.deleteCollection(fullName);
    console.timeEnd("DELETE IN QDRANT");
  } catch (error) {
    console.log(error.message);
  }
};
