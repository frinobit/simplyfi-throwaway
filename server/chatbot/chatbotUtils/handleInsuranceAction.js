const {
  addExpense,
  addInsurance,
  updateInsuranceString,
  updateInsuranceNumber,
} = require("./addFinancial");

const handleInsuranceAction = async (
  action,
  update,
  insuranceCounts,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.insurance.company") {
    insuranceCounts[user_id]++;
    const description = `insurance${insuranceCounts[user_id]}`;

    result = await addInsurance(description, socketIo, user_id, authorization);
    result = await updateInsuranceString(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.insurance.plan") {
    const description = `insurance${insuranceCounts[user_id]}`;
    result = updateInsuranceString(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.insurance.type") {
    const description = `insurance${insuranceCounts[user_id]}`;
    result = updateInsuranceString(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.insurance.sumassured") {
    const description = `insurance${insuranceCounts[user_id]}`;
    result = updateInsuranceNumber(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.insurance.premium") {
    const description = `insurance${insuranceCounts[user_id]}`;
    result = await updateInsuranceNumber(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
    result = await addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};

module.exports = { handleInsuranceAction };
