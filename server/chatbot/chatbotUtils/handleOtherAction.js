import {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
} from "./addFinancial.js";

export const handleOtherAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.other.asset") {
    addAsset(description, socketIo, parameters, user_id, authorization);
  }
  if (action === "provides.other.liability") {
    addLiability(description, socketIo, parameters, user_id, authorization);
  }
  if (action === "provides.other.income") {
    addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.expense") {
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
