import { AssetsContext } from "../../context/financial/AssetsContext";
import { useContext } from "react";

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);

  if (!context) {
    throw Error("useAssetsContext must be used inside a AssetsContextProvider");
  }

  return context;
};
