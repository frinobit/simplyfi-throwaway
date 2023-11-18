import { createContext, useReducer } from "react";

export const CoveragesContext = createContext();

export const coveragesReducer = (state, action) => {
  switch (action.type) {
    case "SET_COVERAGES":
      return {
        coverages: action.payload,
      };
    case "CREATE_COVERAGE":
      return {
        coverages: [action.payload, ...state.coverages],
      };
    case "DELETE_COVERAGE":
      return {
        coverages: state.coverages.filter((f) => f._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CoveragesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coveragesReducer, {
    coverages: null,
  });

  return (
    <CoveragesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CoveragesContext.Provider>
  );
};
