import { SavingsContext } from "../../context/financial/SavingsContext";
import { useContext } from "react";

export const useSavingsContext = () => {
  const context = useContext(SavingsContext);

  if (!context) {
    throw Error(
      "useSavingsContext must be used inside a SavingsContextProvider"
    );
  }

  return context;
};
