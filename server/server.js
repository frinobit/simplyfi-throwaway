require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");
const financialRoute = require("./routes/financialsRoute");
const personalRoute = require("./routes/personalsRoute");
const messageRoute = require("./routes/messagesRoute");
const progressBarRoute = require("./routes/progressBarRoute");

const assetRoute = require("./routes/financial/assetRoute");
const liabilityRoute = require("./routes/financial/liabilityRoute");
const incomeRoute = require("./routes/financial/incomeRoute");
const expenseRoute = require("./routes/financial/expenseRoute");
const savingRoute = require("./routes/financial/savingRoute");
const investmentRoute = require("./routes/financial/investmentRoute");
const insuranceRoute = require("./routes/financial/insuranceRoute");

const dialogflowRoutes = require("./routes/dialogflowRoute");

// express app
const app = express();

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
