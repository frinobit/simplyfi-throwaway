require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const financialRoutes = require("./routes/financials");
const personalRoutes = require("./routes/personals");

// const dialogflowApp = require("./dialogflow");
const dialogflowRouter = require("./chatbot/dialogflowRouter");

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
app.use("/api/personals", personalRoutes);

// app
// app.use(dialogflowApp);
app.use(dialogflowRouter);

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
    console.log(error);
  });
