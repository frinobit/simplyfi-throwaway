import axios from "axios";

export const updateName = async (socketIo, parameters, authorization) => {
  try {
    const name =
      parameters.fields.person.structValue.fields.original.stringValue;

    // edit user using api
    const requestData = { name };
    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/personals/`;
    await axios
      .patch(apiUrl, requestData, { headers })
      // .then((response) => {
      //   console.log("Personal record updated:", response.data);
      // })
      .catch((error) => {
        console.log("API Error:", error.message);
      });

    socketIo.emit("post_request_done", {
      type: "personal_done",
      message: "addPersonal was done!",
    });
  } catch (error) {
    console.log("Error processing message (updateName):", error.message);
  }
};
