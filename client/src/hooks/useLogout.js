import { useAuthContext } from "./useAuthContext";
import { useFinancialsContext } from "./useFinancialsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: financialsDispatch } = useFinancialsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    financialsDispatch({ type: "SET_FINANCIALS", payload: null });
  };

  return { logout };
};
