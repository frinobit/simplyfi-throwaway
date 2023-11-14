import { addIncome } from "./addFinancial.js";

export const handleIncomeAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.income.salary") {
    addIncome(
      description,
      "Salary",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.freelance") {
    addIncome(
      description,
      "Salary",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.bonuses") {
    addIncome(
      description,
      "Bonuses",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.rental") {
    addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.dividend") {
    addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.other") {
    const updatedDescription = parameters.fields.any.stringValue;
    addIncome(
      updatedDescription,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
