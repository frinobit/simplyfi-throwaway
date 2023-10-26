import { ProgressBarContext } from "../context/ProgressBarContext";
import { useContext } from "react";

export const useProgressBarContext = () => {
  const context = useContext(ProgressBarContext);

  if (!context) {
    throw Error(
      "useProgressBarContext must be used inside a ProgressBarContextProvider"
    );
  }

  return context;
};
