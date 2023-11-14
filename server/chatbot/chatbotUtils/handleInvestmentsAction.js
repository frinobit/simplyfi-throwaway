import { addExpense, addInvestment } from "./addFinancial.js";

export const handleInvestmentsAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.investments.other") {
    addInvestment(description, socketIo, parameters, user_id, authorization);
  }
  if (action === "provides.investments.expense") {
    addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
