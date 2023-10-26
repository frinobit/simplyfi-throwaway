import { InsuranceContext } from "../../context/financial/InsuranceContext";
import { useContext } from "react";

export const useInsuranceContext = () => {
  const context = useContext(InsuranceContext);

  if (!context) {
    throw Error(
      "useInsuranceContext must be used inside a InsuranceContextProvider"
    );
  }

  return context;
};
