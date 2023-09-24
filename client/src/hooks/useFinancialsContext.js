import { FinancialsContext } from "../context/FinancialsContext";
import { useContext } from "react";

export const useFinancialsContext = () => {
  const context = useContext(FinancialsContext);

  if (!context) {
    throw Error(
      "useFinancialsContext must be used inside a FinancialsContextProvider"
    );
  }

  return context;
};
