require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const financialRoutes = require("./routes/financials");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/financials", financialRoutes);

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
