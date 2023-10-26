const { addIncome } = require("./addFinancial");

const handleIncomeAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.income.salary") {
    result = addIncome(
      description,
      "Salary",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.freelance") {
    result = addIncome(
      description,
      "Salary",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.bonuses") {
    result = addIncome(
      description,
      "Bonuses",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.rental") {
    result = addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.income.dividend") {
    result = addIncome(
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
    result = addIncome(
      updatedDescription,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};

module.exports = { handleIncomeAction };
