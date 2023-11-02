import { FilesContext } from "../context/FilesContext";
import { useContext } from "react";

export const useFilesContext = () => {
  const context = useContext(FilesContext);

  if (!context) {
    throw Error("useFilesContext must be used inside a FilesContextProvider");
  }

  return context;
};
