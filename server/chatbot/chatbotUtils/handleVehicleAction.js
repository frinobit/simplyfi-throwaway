import {
  addAsset,
  addLiability,
  addIncome,
  addExpense,
} from "./addFinancial.js";

export const handleVehicleAction = (
  action,
  vehicleCounts,
  socketIo,
  parameters,
  user_id,
  authorization
) => {
  if (action === "provides.vehicle.asset") {
    vehicleCounts[user_id]++;
    const description = `vehicle${vehicleCounts[user_id]}`;
    result = addAsset(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.vehicle.liability") {
    const description = `vehicle${vehicleCounts[user_id]}`;
    result = addLiability(
      description,
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.vehicle.income") {
    const description = `vehicle${vehicleCounts[user_id]}`;
    result = addIncome(
      description,
      "Others",
      socketIo,
      parameters,
      user_id,
      authorization
    );
  }
  if (action === "provides.vehicle.expense") {
    const description = `vehicle${vehicleCounts[user_id]}`;
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
