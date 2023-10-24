import { ExpensesContext } from "../../context/financial/ExpensesContext";
import { useContext } from "react";

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw Error(
      "useExpensesContext must be used inside a ExpensesContextProvider"
    );
  }

  return context;
};
