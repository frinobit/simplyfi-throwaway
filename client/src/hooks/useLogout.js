import { useAuthContext } from "./useAuthContext";
import { useFinancialsContext } from "./useFinancialsContext";
import { usePersonalsContext } from "./usePersonalsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: financialsDispatch } = useFinancialsContext();
  const { dispatch: personalsDispatch } = usePersonalsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // clear screen
    financialsDispatch({ type: "SET_FINANCIALS", payload: null });
    personalsDispatch({ type: "SET_PERSONALS", payload: null });
  };

  return { logout };
};
