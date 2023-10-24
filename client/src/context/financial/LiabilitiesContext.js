import { createContext, useReducer } from "react";

export const LiabilitiesContext = createContext();

export const liabilitiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIABILITIES":
      return {
        liabilities: action.payload,
      };
    case "CREATE_LIABILITY":
      return {
        liabilities: [action.payload, ...state.liabilities],
      };
    case "DELETE_LIABILITY":
      return {
        liabilities: state.liabilities.filter(
          (f) => f._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const LiabilitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(liabilitiesReducer, {
    liabilities: null,
  });

  return (
    <LiabilitiesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LiabilitiesContext.Provider>
  );
};
