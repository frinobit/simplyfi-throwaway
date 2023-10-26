import { createContext, useReducer } from "react";

export const ProgressBarContext = createContext();

export const progressBarReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROGRESSBAR":
      return {
        progressBar: action.payload,
      };
    case "CREATE_PROGRESSBAR":
      return {
        progressBar: [action.payload, ...state.progressBar],
      };
    case "DELETE_PROGRESSBAR":
      return {
        progressBar: state.progressBar.filter(
          (f) => f._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ProgressBarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(progressBarReducer, {
    progressBar: null,
  });

  return (
    <ProgressBarContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProgressBarContext.Provider>
  );
};
