const {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
} = require("./addFinancial");

const handleOtherAction = (
  action,
  otherCounts,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.other.asset") {
    otherCounts[user_id]++;
    const description = `other${otherCounts[user_id]}`;
    result = addAsset(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.liability") {
    const description = `other${otherCounts[user_id]}`;
    result = addLiability(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.income") {
    const description = `other${otherCounts[user_id]}`;
    result = addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.expense") {
    const description = `other${otherCounts[user_id]}`;
    result = addExpense(
      description,
      "Fixed",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};

module.exports = { handleOtherAction };
