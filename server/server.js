import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router as userRoute } from "./routes/userRoute.js";

import { router as financialRoute } from "./routes/financialRoute.js";
import { router as personalRoute } from "./routes/personalRoute.js";
import { router as messageRoute } from "./routes/messageRoute.js";
import { router as deepdiveRoute } from "./routes/deepdiveRoute.js";
import { router as progressBarRoute } from "./routes/progressBarRoute.js";

import { router as assetRoute } from "./routes/financial/assetRoute.js";
import { router as liabilityRoute } from "./routes/financial/liabilityRoute.js";
import { router as incomeRoute } from "./routes/financial/incomeRoute.js";
import { router as expenseRoute } from "./routes/financial/expenseRoute.js";
import { router as savingRoute } from "./routes/financial/savingRoute.js";
import { router as investmentRoute } from "./routes/financial/investmentRoute.js";
import { router as insuranceRoute } from "./routes/financial/insuranceRoute.js";

import { router as dialogflowRoute } from "./routes/dialogflowRoute.js";
import { router as openaiRoute } from "./routes/openaiRoute.js";

import { router as fileRoute } from "./routes/fileRoute.js";
import { router as myinfoRoute } from "./routes/myinfoRoute.js";

// express app
const app = express();

app.use(cors());
app.use(cookieParser());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes - general
app.use("/api/user", userRoute);
app.use("/api/financials", financialRoute);
app.use("/api/personals", personalRoute);
app.use("/api/message", messageRoute);
app.use("/api/deepdive", deepdiveRoute);
app.use("/api/progressbar", progressBarRoute);

// routes - financial
app.use("/api/financial/asset", assetRoute);
app.use("/api/financial/liability", liabilityRoute);
app.use("/api/financial/income", incomeRoute);
app.use("/api/financial/expense", expenseRoute);
app.use("/api/financial/saving", savingRoute);
app.use("/api/financial/investment", investmentRoute);
app.use("/api/financial/insurance", insuranceRoute);

// routes - chatbots
app.use("/dialogflow", dialogflowRoute);
app.use("/openai", openaiRoute);

// routes - upload
app.use("/file", fileRoute);

// routes - myinfo
app.use("/myinfo", myinfoRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.HTTP_PORT, () => {
      console.log(
        "Connected to db and HTTP server started on port",
        process.env.HTTP_PORT
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
