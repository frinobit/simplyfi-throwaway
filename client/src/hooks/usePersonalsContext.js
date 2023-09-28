import { PersonalsContext } from "../context/PersonalsContext";
import { useContext } from "react";

export const usePersonalsContext = () => {
  const context = useContext(PersonalsContext);

  if (!context) {
    throw Error(
      "usePersonalsContext must be used inside a PersonalsContextProvider"
    );
  }

  return context;
};
