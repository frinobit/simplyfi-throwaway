import { useAuthContext } from "./useAuthContext";
import { useFinancialsContext } from "./useFinancialsContext";
import { usePersonalsContext } from "./usePersonalsContext";
import { useAssetsContext } from "./financial/useAssetsContext";
import { useLiabilitiesContext } from "./financial/useLiabilitiesContext";
import { useIncomeContext } from "./financial/useIncomeContext";
import { useExpensesContext } from "./financial/useExpensesContext";

import { app } from "../config/firebase-config";
import { getAuth, signOut } from "firebase/auth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: financialsDispatch } = useFinancialsContext();
  const { dispatch: personalsDispatch } = usePersonalsContext();
  const { dispatch: assetsDispatch } = useAssetsContext();
  const { dispatch: liabilitiesDispatch } = useLiabilitiesContext();
  const { dispatch: incomeDispatch } = useIncomeContext();
  const { dispatch: expensesDispatch } = useExpensesContext();

  const auth = getAuth(app);

  const logout = async () => {
    // logout of firebase
    await signOut(auth);

    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    await dispatch({ type: "LOGOUT" });

    // clear screen
    await financialsDispatch({ type: "SET_FINANCIALS", payload: null });
    await personalsDispatch({ type: "SET_PERSONALS", payload: null });
    await assetsDispatch({ type: "SET_ASSETS", payload: null });
    await liabilitiesDispatch({ type: "SET_LIABILITIES", payload: null });
    await incomeDispatch({ type: "SET_INCOMES", payload: null });
    await expensesDispatch({ type: "SET_EXPENSES", payload: null });
  };

  return { logout };
};
