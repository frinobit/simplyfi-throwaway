import { createContext, useReducer } from "react";

export const FinancialsContext = createContext();

export const financialsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FINANCIALS":
      return {
        financials: action.payload,
      };
    case "CREATE_FINANCIAL":
      return {
        financials: [action.payload, ...state.financials],
      };
    case "DELETE_FINANCIAL":
      return {
        financials: state.financials.filter(
          (f) => f._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const FinancialsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financialsReducer, {
    financials: null,
  });

  return (
    <FinancialsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FinancialsContext.Provider>
  );
};
