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

    socketIo.emit("post_request_done", {
      type: "asset_done",
      message: "addAsset was done!",
    });
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

    socketIo.emit("post_request_done", {
      type: "liability_done",
      message: "addLiability was done!",
    });
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

    socketIo.emit("post_request_done", {
      type: "income_done",
      message: "addIncome was done!",
    });
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

    socketIo.emit("post_request_done", {
      type: "expense_done",
      message: "addExpense was done!",
    });
  } catch (error) {
    console.log("Error processing message (addExpense):", error.message);
  }
};

const addSaving = async (
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
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/saving`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "saving_done",
      message: "addSaving was done!",
    });
  } catch (error) {
    console.log("Error processing message (addSaving):", error.message);
  }
};

const addInvestment = async (
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
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/investment`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "investment_done",
      message: "addInvestment was done!",
    });
  } catch (error) {
    console.log("Error processing message (addInvestment):", error.message);
  }
};

const addInsurance = async (description, socketIo, user_id, authorization) => {
  try {
    const requestData = {
      description: description,
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/insurance`;
    await axios.post(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "insurance_done",
      message: "addInsurance was done!",
    });
  } catch (error) {
    console.log("Error processing message (addInsurance):", error.message);
  }
};

const updateInsuranceString = async (
  update,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const updateValue = parameters.fields.any.stringValue;

    let requestData;
    if (update === "company") {
      requestData = {
        description: description,
        company: updateValue,
        user_id: user_id,
      };
    }
    if (update === "plan") {
      requestData = {
        description: description,
        plan: updateValue,
        user_id: user_id,
      };
    }
    if (update === "type") {
      requestData = {
        description: description,
        type: updateValue,
        user_id: user_id,
      };
    }
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/insurance`;
    await axios.patch(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "insurance_done",
      message: "updateInsurance was done!",
    });
  } catch (error) {
    console.log("Error processing message (updateInsurance):", error.message);
  }
};

const updateInsuranceNumber = async (
  update,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  try {
    const updateValue = parameters.fields.number.numberValue;

    let requestData;
    if (update === "sumassured") {
      requestData = {
        description: description,
        sumassured: updateValue,
        user_id: user_id,
      };
    }
    if (update === "premium") {
      requestData = {
        description: description,
        premium: updateValue,
        user_id: user_id,
      };
    }
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/financial/insurance`;
    await axios.patch(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "insurance_done",
      message: "updateInsurance was done!",
    });
  } catch (error) {
    console.log("Error processing message (updateInsurance):", error.message);
  }
};

module.exports = {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
  addSaving,
  addInvestment,
  addInsurance,
  updateInsuranceString,
  updateInsuranceNumber,
};
