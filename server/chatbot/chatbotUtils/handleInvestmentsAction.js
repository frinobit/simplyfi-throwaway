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
    result = addInvestment(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.investments.expense") {
    result = addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
