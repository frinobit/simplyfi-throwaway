import { useAuthContext } from "./useAuthContext";
import { useFinancialsContext } from "./useFinancialsContext";
import { usePersonalsContext } from "./usePersonalsContext";
import { useProgressBarContext } from "./useProgressBarContext";
import { useFilesContext } from "./useFilesContext";
import { useCoveragesContext } from "./useCoveragesContext";
import { useAssetsContext } from "./financial/useAssetsContext";
import { useLiabilitiesContext } from "./financial/useLiabilitiesContext";
import { useIncomeContext } from "./financial/useIncomeContext";
import { useExpensesContext } from "./financial/useExpensesContext";
import { useSavingsContext } from "./financial/useSavingsContext";
import { useInvestmentsContext } from "./financial/useInvestmentsContext";

import { app } from "../config/firebase-config";
import { getAuth, signOut } from "firebase/auth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: financialsDispatch } = useFinancialsContext();
  const { dispatch: personalsDispatch } = usePersonalsContext();
  const { dispatch: progressBarDispatch } = useProgressBarContext();
  const { dispatch: coveragesDispatch } = useCoveragesContext();
  const { dispatch: filesDispatch } = useFilesContext();
  const { dispatch: assetsDispatch } = useAssetsContext();
  const { dispatch: liabilitiesDispatch } = useLiabilitiesContext();
  const { dispatch: incomeDispatch } = useIncomeContext();
  const { dispatch: expensesDispatch } = useExpensesContext();
  const { dispatch: savingsDispatch } = useSavingsContext();
  const { dispatch: investmentsDispatch } = useInvestmentsContext();

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
    await progressBarDispatch({ type: "SET_PROGRESSBAR", payload: null });
    await filesDispatch({ type: "SET_FILES", payload: null });
    await coveragesDispatch({ type: "SET_COVERAGES", payload: null });
    await assetsDispatch({ type: "SET_ASSETS", payload: null });
    await liabilitiesDispatch({ type: "SET_LIABILITIES", payload: null });
    await incomeDispatch({ type: "SET_INCOMES", payload: null });
    await expensesDispatch({ type: "SET_EXPENSES", payload: null });
    await savingsDispatch({ type: "SET_SAVINGS", payload: null });
    await investmentsDispatch({ type: "SET_INVESTMENTS", payload: null });
  };

  return { logout };
};
