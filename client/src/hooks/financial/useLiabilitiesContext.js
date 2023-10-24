import { LiabilitiesContext } from "../../context/financial/LiabilitiesContext";
import { useContext } from "react";

export const useLiabilitiesContext = () => {
  const context = useContext(LiabilitiesContext);

  if (!context) {
    throw Error(
      "useLiabilitiesContext must be used inside a LiabilitiesContextProvider"
    );
  }

  return context;
};
