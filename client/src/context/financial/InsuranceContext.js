import { createContext, useReducer } from "react";

export const InsuranceContext = createContext();

export const insuranceReducer = (state, action) => {
  switch (action.type) {
    case "SET_INSURANCES":
      return {
        insurance: action.payload,
      };
    case "CREATE_INSURANCE":
      return {
        insurance: [action.payload, ...state.insurance],
      };
    case "DELETE_INSURANCE":
      return {
        insurance: state.insurance.filter((f) => f._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const InsuranceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(insuranceReducer, {
    insurance: null,
  });

  return (
    <InsuranceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InsuranceContext.Provider>
  );
};
