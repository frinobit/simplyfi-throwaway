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
    result = addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.utilities") {
    result = addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.food") {
    result = addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.commute") {
    result = addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.insurance") {
    result = addExpense(
      description,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.entertainment") {
    result = addExpense(
      description,
      "Variables",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.education") {
    result = addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.expenses.loan") {
    result = addExpense(
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
    result = addExpense(
      updatedDescription,
      "Annual",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
