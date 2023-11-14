import {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
} from "./addFinancial.js";

export const handleOtherAction = (
  action,
  description,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.other.asset") {
    result = addAsset(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.liability") {
    result = addLiability(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.other.income") {
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
