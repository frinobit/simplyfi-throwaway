const axios = require("axios");

const addAsset = async (
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const amount = parameters.fields.number.numberValue;

    const requestData = {
      description: description,
      amount: amount,
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/asset`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (addAsset):", error.message);
  }
};

const addLiability = async (
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const amount = parameters.fields.number.numberValue;

    const requestData = {
      description: description,
      amount: amount,
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/liability`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (addLiability):", error.message);
  }
};

const addIncome = async (
  description,
  type,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const amount = parameters.fields.number.numberValue;

    const requestData = {
      description: description,
      type: type,
      amount: amount,
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/income`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (addIncome):", error.message);
  }
};

const addExpense = async (
  description,
  type,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const amount = parameters.fields.number.numberValue;

    const requestData = {
      description: description,
      type: type,
      amount: amount,
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/expense`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (addExpense):", error.message);
  }
};

module.exports = { addAsset, addLiability, addIncome, addExpense };
