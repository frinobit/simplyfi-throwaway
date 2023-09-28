import { createContext, useReducer } from "react";

export const PersonalsContext = createContext();

export const personalsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSONALS":
      return {
        personals: action.payload,
      };
    case "CREATE_PERSONAL":
      return {
        personals: [action.payload, ...state.personals],
      };
    case "DELETE_PERSONAL":
      return {
        personals: state.personals.filter((f) => f._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PersonalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personalsReducer, {
    financials: null,
  });

  return (
    <PersonalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PersonalsContext.Provider>
  );
};
