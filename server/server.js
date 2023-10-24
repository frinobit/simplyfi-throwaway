require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const financialRoutes = require("./routes/financials");
const personalRoutes = require("./routes/personals");
const messageRoutes = require("./routes/messages");

const assetRoute = require("./routes/financial//assetRoute");
const liabilityRoute = require("./routes/financial//liabilityRoute");
const incomeRoute = require("./routes/financial//incomeRoute");
const expenseRoute = require("./routes/financial//expenseRoute");

const dialogflowRoutes = require("./routes/dialogflow");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes - database
app.use("/api/user", userRoutes);
app.use("/api/financials", financialRoutes);
app.use("/api/personals", personalRoutes);
app.use("/api/messages", messageRoutes);

app.use("/api/financial/asset", assetRoute);
app.use("/api/financial/liability", liabilityRoute);
app.use("/api/financial/income", incomeRoute);
app.use("/api/financial/expense", expenseRoute);

// routes- dialogflow
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
