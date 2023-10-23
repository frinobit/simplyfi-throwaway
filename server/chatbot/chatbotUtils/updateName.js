const axios = require("axios");
const Personal = require("../../models/personalModel");

const updateName = async (socketIo, parameters, user_id, authorization) => {
  try {
    const name =
      parameters.fields.person.structValue.fields.original.stringValue;

    // edit user using api
    const requestData = {
      user_id: user_id,
      name: name,
    };
    const headers = { Authorization: authorization };
    const personal_data = await Personal.findOne({ user_id });
    const personal_id = personal_data._id;
    const apiUrl = `${process.env.BACKEND_URL}/api/personals/${personal_id}`;
    await axios
      .patch(apiUrl, requestData, { headers })
      // .then((response) => {
      //   console.log("Personal record updated:", response.data);
      // })
      .catch((error) => {
        console.log("API Error:", error.message);
      });

    // socket - send message to frontend that user info updated
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  } catch (error) {
    console.log("Error processing message (updateName):", error.message);
  }
};

module.exports = { updateName };
