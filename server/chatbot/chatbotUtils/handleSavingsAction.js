const { addSaving } = require("./addFinancial");

const handleSavingsAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.savings.longterm") {
    result = addSaving(
      description,
      "Long-Term",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.savings.emergencyfund") {
    result = addSaving(
      description,
      "Emergency Fund",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.savings.shortterm") {
    result = addSaving(
      description,
      "Short-Term",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};

module.exports = { handleSavingsAction };
