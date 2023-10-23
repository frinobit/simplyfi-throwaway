const axios = require("axios");
const Financial = require("../../models/financialModel");

const updateIncome = async (
  socketIo,
  parameters,
  user_id,
  authorization,
  description
) => {
  try {
    const amount = parameters.fields.number.numberValue;

    const descriptionToTypeMapping = {
      salary: "Salary",
      freelance: "Others",
      bonus: "Bonuses",
      rental: "Others",
      dividend: "Others",
      other_income: "Others",
    };
    const type = descriptionToTypeMapping[description];

    // edit user using api
    const requestData = {
      user_id: user_id,
      income: {
        description: description,
        type: type,
        amount: amount,
      },
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
    console.log("Error processing message (updateIncome):", error.message);
  }
};

module.exports = { updateIncome };
