import { createContext, useReducer } from "react";

export const SavingsContext = createContext();

export const savingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SAVINGS":
      return {
        savings: action.payload,
      };
    case "CREATE_SAVING":
      return {
        savings: [action.payload, ...state.savings],
      };
    case "DELETE_SAVING":
      return {
        savings: state.savings.filter((f) => f._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SavingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(savingsReducer, {
    savings: null,
  });

  return (
    <SavingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SavingsContext.Provider>
  );
};
