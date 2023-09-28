require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const financialRoutes = require("./routes/financials");
const goalRoutes = require("./routes/goals");
const personalRoutes = require("./routes/personals");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/financials", financialRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/personals", personalRoutes);

// dialogflow
app.post("/dialogflow", (req, res) => {
  const payload = req.body;

  const intent = payload.queryResult.intent.displayName;
  const parameters = payload.queryResult.parameters;

  if (intent === "update-name - context: ongoing-update-profile") {
    const name = parameters["given-name"];
    const fulfillmentText = `webhook - The name of ${name} is okay`;
    const response = { fulfillmentText };
    res.status(200).json(response);
  }
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and server started on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
