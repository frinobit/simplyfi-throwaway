import { addExpense } from "./addFinancial.js";

export const handleExpensesAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.expenses.rental") {
    addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.utilities") {
    addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.food") {
    addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.commute") {
    addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.insurance") {
    addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.entertainment") {
    addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.education") {
    addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.loan") {
    addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.other") {
    const updatedDescription = parameters.fields.any.stringValue;
    addExpense(
      updatedDescription,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
