import { IncomeContext } from "../../context/financial/IncomeContext";
import { useContext } from "react";

export const useIncomeContext = () => {
  const context = useContext(IncomeContext);

  if (!context) {
    throw Error("useIncomeContext must be used inside a IncomeContextProvider");
  }

  return context;
};
