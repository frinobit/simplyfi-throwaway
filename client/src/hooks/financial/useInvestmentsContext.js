import { InvestmentsContext } from "../../context/financial/InvestmentsContext";
import { useContext } from "react";

export const useInvestmentsContext = () => {
  const context = useContext(InvestmentsContext);

  if (!context) {
    throw Error(
      "useInvestmentsContext must be used inside a InvestmentsContextProvider"
    );
  }

  return context;
};
