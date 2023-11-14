import {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
} from "./addFinancial.js";

export const handlePropertyAction = (
  action,
  propertyCounts,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.property.asset") {
    propertyCounts[user_id]++;
    const description = `property${propertyCounts[user_id]}`;
    addAsset(description, socketIo, parameters, user_id, authorization);
  }
  if (action === "provides.property.liability") {
    const description = `property${propertyCounts[user_id]}`;
    addLiability(description, socketIo, parameters, user_id, authorization);
  }
  if (action === "provides.property.income") {
    const description = `property${propertyCounts[user_id]}`;
    addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.property.expense") {
    const description = `property${propertyCounts[user_id]}`;
    addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
