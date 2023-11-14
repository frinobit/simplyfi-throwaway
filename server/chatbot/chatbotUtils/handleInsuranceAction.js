import {
  addExpense,
  addInsurance,
  updateInsuranceString,
  updateInsuranceNumber,
} from "./addFinancial.js";

export const handleInsuranceAction = async (
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

    await addInsurance(description, socketIo, user_id, authorization);
    await updateInsuranceString(
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
    updateInsuranceString(
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
    updateInsuranceString(
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
    updateInsuranceNumber(
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
    await updateInsuranceNumber(
      update,
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
    await addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
