import { addSaving } from "./addFinancial.js";

export const handleSavingsAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.savings.longterm") {
    addSaving(
      description,
      "Long-Term",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.savings.emergencyfund") {
    addSaving(
      description,
      "Emergency Fund",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.savings.shortterm") {
    addSaving(
      description,
      "Short-Term",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
};
