import { createContext, useReducer } from "react";

export const AssetsContext = createContext();

export const assetsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ASSETS":
      return {
        assets: action.payload,
      };
    case "CREATE_ASSET":
      return {
        assets: [action.payload, ...state.assets],
      };
    case "DELETE_ASSET":
      return {
        assets: state.assets.filter((f) => f._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AssetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, {
    assets: null,
  });

  return (
    <AssetsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AssetsContext.Provider>
  );
};
