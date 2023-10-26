const axios = require("axios");

const updateProgressBar = async (
  intent,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  const yesno =
    parameters.fields.yesnoresponse.structValue.fields.original.stringValue;
  if (intent.startsWith("AskYesNo") && yesno !== "no") {
    return;
  }

  try {
    let step = 1;

    switch (intent) {
      case "provides.personal.name":
        step = 1;
        break;
      case "AskYesNoQuestionProperty":
        step = 2;
        break;
      case "AskYesNoQuestionVehicle":
      case "provides.vehicle.expense":
        step = 3;
        break;
      case "AskYesNoQuestionOther":
      case "provides.other.expense":
        step = 4;
        break;
      case "AskYesNoQuestionIncome":
        step = 5;
        break;
      case "AskYesNoQuestionExpenses":
        step = 6;
        break;
      case "provides.savings.shortterm":
        step = 7;
        break;
      case "AskYesNoQuestionInvestments":
        step = 8;
        break;
      case "AskYesNoQuestionInsurance":
        step = 9;
        break;
      default:
        step = 1;
    }

    const requestData = {
      user_id: user_id,
      step: step,
    };

    const headers = { Authorization: authorization };
    const apiUrl = `${process.env.BACKEND_URL}/api/progressbar`;
    await axios.patch(apiUrl, requestData, { headers }).catch((error) => {
      console.log("API Error:", error.message);
    });

    socketIo.emit("post_request_done", {
      type: "progressbar_done",
      message: "updateProgressBar was done!",
    });
  } catch (error) {
    console.log("Error processing message (updateProgressBar):", error.message);
  }
};

module.exports = { updateProgressBar };
