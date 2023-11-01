require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const financialRoute = require("./routes/financialRoute");
const personalRoute = require("./routes/personalRoute");
const messageRoute = require("./routes/messageRoute");
const deepdiveRoute = require("./routes/deepdiveRoute");
const progressBarRoute = require("./routes/progressBarRoute");

const assetRoute = require("./routes/financial/assetRoute");
const liabilityRoute = require("./routes/financial/liabilityRoute");
const incomeRoute = require("./routes/financial/incomeRoute");
const expenseRoute = require("./routes/financial/expenseRoute");
const savingRoute = require("./routes/financial/savingRoute");
const investmentRoute = require("./routes/financial/investmentRoute");
const insuranceRoute = require("./routes/financial/insuranceRoute");

const dialogflowRoutes = require("./routes/dialogflowRoute");

const generate = require("./openai/generate");

// express app
const app = express();

app.use(cors());

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
app.use("/api/messages", messageRoute);
app.use("/api/deepdives", deepdiveRoute);
app.use("/api/progressbar", progressBarRoute);

// routes - financial
app.use("/api/financial/asset", assetRoute);
app.use("/api/financial/liability", liabilityRoute);
app.use("/api/financial/income", incomeRoute);
app.use("/api/financial/expense", expenseRoute);
app.use("/api/financial/saving", savingRoute);
app.use("/api/financial/investment", investmentRoute);
app.use("/api/financial/insurance", insuranceRoute);

// routes - dialogflow
app.use("/dialogflow", dialogflowRoutes);

// routes - openai
app.post("/openai", async (req, res) => {
  const queryDescription = req.body.queryDescription;
  try {
    const response = await generate(queryDescription);
    res.status(200).json({ response: response });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

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
