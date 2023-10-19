const axios = require("axios");
const Financial = require("../../models/financialModel");

const updateFixed = async (socketIo, parameters, user_id, authorization) => {
  try {
    const fixed = parameters.fields.number.numberValue;

    // edit user using api
    const requestData = {
      expenses: {
        description: "default",
        type: "Fixed",
        amount: fixed,
      },
      user_id: user_id,
    };
    const headers = { Authorization: authorization };
    const financial_data = await Financial.findOne({ user_id });
    const financial_id = financial_data._id;
    const apiUrl = `${process.env.BACKEND_URL}/api/financials/${financial_id}`;
    await axios
      .patch(apiUrl, requestData, { headers })
      // .then((response) => {
      //   console.log("Financial record updated:", response.data);
      // })
      .catch((error) => {
        console.log("API Error:", error.message);
      });

    // socket - send message to frontend that user info updated
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (updateSalary):", error.message);
  }
};

module.exports = { updateFixed };
