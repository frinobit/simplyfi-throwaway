import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { app } from "../config/firebase-config";
import { getAuth, signInAnonymously } from "firebase/auth";

export const useLoginGuest = () => {
  const [errorGuest, setErrorGuest] = useState(null);
  const [isLoadingGuest, setIsLoadingGuest] = useState(null);
  const { dispatch } = useAuthContext();

  const auth = getAuth(app);

  const loginGuest = async () => {
    setIsLoadingGuest(true);
    setErrorGuest(null);

    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      const uid = user.uid;
      const token = await user.getIdToken();
      const email = "";

      const response = await fetch("/api/user/loginGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, email, token }),
      });
      const json = await response.json();

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadingGuest(false);
    } catch (error) {
      setErrorGuest("An error occurred. Please try again later.");
      setIsLoadingGuest(false);
    }
  };

  return { loginGuest, isLoadingGuest, errorGuest };
};
