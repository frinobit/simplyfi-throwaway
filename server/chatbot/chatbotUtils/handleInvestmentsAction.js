const { addExpense, addInvestment } = require("./addFinancial");

const handleInvestmentsAction = (
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
  if (action === "provides.property.expense") {
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

module.exports = { handleInvestmentsAction };
