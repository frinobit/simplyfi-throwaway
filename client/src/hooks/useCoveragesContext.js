import { CoveragesContext } from "../context/CoveragesContext";
import { useContext } from "react";

export const useCoveragesContext = () => {
  const context = useContext(CoveragesContext);

  if (!context) {
    throw Error(
      "useCoveragesContext must be used inside a CoveragesContextProvider"
    );
  }

  return context;
};
