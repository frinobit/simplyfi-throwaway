import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { app } from "../config/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useLoginGoogle = () => {
  const [errorGoogle, setErrorGoogle] = useState(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(null);
  const { dispatch } = useAuthContext();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email;
    const uid = user.uid;
    const token = await user.getIdToken();

    const response = await fetch("/api/user/loginGoogle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, uid, token }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoadingGoogle(false);
      setErrorGoogle(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadingGoogle(false);
    }
  };

  return { loginGoogle, isLoadingGoogle, errorGoogle };
};
