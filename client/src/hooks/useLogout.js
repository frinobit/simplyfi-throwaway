import { useAuthContext } from "./useAuthContext";
import { useFinancialsContext } from "./useFinancialsContext";
import { usePersonalsContext } from "./usePersonalsContext";

import { app } from "../config/firebase-config";
import { getAuth, signOut } from "firebase/auth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: financialsDispatch } = useFinancialsContext();
  const { dispatch: personalsDispatch } = usePersonalsContext();

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
  };

  return { logout };
};
